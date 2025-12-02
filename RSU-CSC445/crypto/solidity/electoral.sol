// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.30;

enum Status {
    Waiting,
    General,
    Electoral,
    Finished
}

struct Official {
    address addressID;
    uint8 stateID;
}
struct Party {
    string candidateName;
    string candidateImage;

    string viceName;
    string viceImage;
}
struct CitizenVote {
    uint64 citizenID;
    uint8 partyID;
    uint8 stateID;
}
struct ElectoralVote {
    uint64 citizenID;
    uint8 partyID;
    uint8 stateID;
}

contract Electoral {
    Status public status = Status.Waiting;
    
    address public chairPerson;
    Official[] public officials;
    
    uint8 public stateIDMaximum;
    Party[] public parties;
    CitizenVote[] public citizens;
    CitizenVote[] public electors;
    CitizenVote[] public realElectors;
    ElectoralVote[] public electorals;

    mapping(uint8 => mapping(uint8 => uint64)) public citizenVotes;
    mapping(uint8 => uint64) public popularVotes;
    mapping(uint8 => uint64) public electoralVotes;

    uint8 public partyPopularWin;
    uint8 public partyElectoralWin;
    bool public isElectorsElected;
    bool public isPresidentElected;

    constructor() { chairPerson = msg.sender; }

    function getStatus() public view returns (Status) {
        return status;
    }
    function isChairPerson() public view returns (bool) {
        return chairPerson == msg.sender;
    }
    function isOfficialPerson() public view returns (bool) {
        for (uint x = 0; x < officials.length; x++) {
            if (officials[x].addressID == msg.sender) {
                return true;
            }
        }

        return false;
    }
    function isElectedElector(uint64 citizenID) public view returns (bool) {
        for (uint x = 0; x < realElectors.length; x++) {
            if (realElectors[x].citizenID == citizenID) {
                return true;
            }
        }

        return false;
    }
    function getElectorsCount() public view returns (uint16) {
        return uint16(electors.length);
    }

    function getPartyCount() public view returns (uint) {
        return parties.length;
    }

    function addOfficial(address addressID, uint8 stateID) public chairPersonOnly {
        bool abort = false;
        
        // A state shouldn't have more than one party elector.
        for (uint8 index = 0; index < officials.length; index++) {
            if (officials[index].addressID == addressID) {
                abort = true;
            }
        }

        require(!abort, "Already is an official");

        officials.push(Official(addressID, stateID));
        addStateID(stateID);
    }
    function addElector(uint64 citizenID, uint8 partyID, uint8 stateID) public chairPersonOnly {
        bool abort = false;
        
        // A state shouldn't have more than one party elector.
        for (uint8 electorID = 0; electorID < electors.length; electorID++) {
            if (electors[electorID].partyID == partyID && electors[electorID].stateID == stateID) {
                abort = true;
            }
        }

        require(!abort, "A state shouldn't have more than one elector");
        
        electors.push(CitizenVote(citizenID, partyID, stateID));
    }
    function addParty(string memory candidateName, string memory candidateImage, string memory viceName, string memory viceImage) public chairPersonOnly {
        parties.push(Party(candidateName, candidateImage, viceName, viceImage));
    }

    function setStatus(Status newStatus) public chairPersonOnly {
        if (status == Status.General && newStatus == Status.Electoral) {
            electElectors();
        }
        if (status == Status.Electoral && newStatus == Status.Finished) {
            electPresident();
        }
        
        status = newStatus;
    }

    function citizenVote(uint64 citizenID, uint8 partyID) public statusOnly(Status.General) officialOnly {
        bool abort = false;
        
        // A state shouldn't have more than one party elector.
        for (uint8 citizenIndex = 0; citizenIndex < citizens.length; citizenIndex++) {
            if (citizens[citizenIndex].citizenID == citizenID) {
                abort = true;
            }
        }

        require(!abort, "Already Voted");
        
        uint8 stateID = officialGetStateID();

        citizenVotes[stateID][partyID]++;
        citizens.push(CitizenVote(citizenID, partyID, stateID));
    }
    function electElectors() public statusOnly(Status.General) chairPersonOnly {
        require(!isElectorsElected, "Electors are already elected");

        for (uint8 stateID = 0; stateID < stateIDMaximum; stateID++) {
            uint64 winnerScore = 0;
            uint8 winner = 0;

            // Checks for party's winner for the state.
            for (uint8 partyID = 0; partyID < parties.length; partyID++) {
                popularVotes[partyID] += citizenVotes[stateID][partyID];

                if (citizenVotes[stateID][partyID] > winnerScore) {
                    winnerScore = citizenVotes[stateID][partyID];
                    winner = partyID;
                }
            }

            // Elects an electors of the state.
            for (uint16 electorID = 0; electorID < electors.length; electorID++) {
                if (electors[electorID].partyID == winner && electors[electorID].stateID == stateID) {
                    realElectors.push(electors[electorID]);
                    break;
                }
            }
        }

        uint64 _winnerScore = 0;
        uint8 _winner = 0;

        // Checks for popular vote winenr.
        for (uint8 partyID = 0; partyID < parties.length; partyID++) {
            if (popularVotes[partyID] > _winnerScore) {
                _winnerScore = popularVotes[partyID];
                _winner = partyID;
            }
        }

        require(realElectors.length != 0, "No Electors Elected");

        partyPopularWin = _winner;
        isElectorsElected = true;
    }
    function electPresident() public statusOnly(Status.Electoral) chairPersonOnly {
        require(!isPresidentElected, "President are already elected");
        
        uint64 winnerScore = 0;
        uint8 winner = 0;

        for (uint8 partyID = 0; partyID < parties.length; partyID++) {
            if (electoralVotes[partyID] > winnerScore) {
                winnerScore = electoralVotes[partyID];
                winner = partyID;
            }
        }

        partyElectoralWin = winner;
        isPresidentElected = true;
    }
    function electorVote(uint64 citizenID, uint8 partyID) public statusOnly(Status.Electoral) officialOnly {
        bool isReal = false;

        for (uint x = 0; x < realElectors.length; x++) {
            if (realElectors[x].citizenID == citizenID) {
                isReal = true;
                break;
            }
        }

        require(isReal, "Not an elected elector");

        uint8 stateID = officialGetStateID();

        electorals.push(ElectoralVote(citizenID, partyID, stateID));
        electoralVotes[partyID]++;
    }
    
    function addStateID(uint8 stateID) private {
        if ((stateID + 1) > stateIDMaximum) {
            stateIDMaximum = stateID + 1;
        }
        for (uint8 partyID = 0; partyID < parties.length; partyID++) {
            citizenVotes[stateID];
            citizenVotes[stateID][partyID];
        }
    }
    function officialGetStateID() view private returns (uint8) {
        uint8 ID = 0;
        
        for (uint x = 0; x < officials.length; x++) {
            if (officials[x].addressID == msg.sender) {
                ID = officials[x].stateID;
                break;
            }
        }

        return ID;
    }

    modifier chairPersonOnly() {
        require(chairPerson == msg.sender, "ChairPerson only");
        
        _;
    }    
    modifier officialOnly() {
        bool isReal = false;

        for (uint x = 0; x < officials.length; x++) {
            if (officials[x].addressID == msg.sender) {
                isReal = true;
                break;
            }
        }

        require(isReal, "Not an official");
        
        _;
    } 
    modifier statusOnly(Status onlyStatus) {
        require(status == onlyStatus, "Status not match");
        
        _;
    }
}