// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.30;

enum Status {
    Waiting,
    General,
    Electoral,

    Canceled,
    Finished
}
struct Official {
    address id;
    string state;
}
struct Party {
    uint64 candidateID;
    string candidateName;
    string candidateImage;
}
struct Elector {
    uint64 id;
    string state;
    uint8 party;
}
struct CitizenVote {
    uint64 id;
    string state;
    uint8 party;
}

contract Electoral {
    Status public status = Status.Waiting;
    
    // The operators.
    address[] public chairPeople;
    // The people in-charge of the ballot.
    // Has the ability to vote on behalf of
    // the citizen but still need to uses the
    // valid citizen id to vote.
    Official[] public officalPeople;
    
    string[] public states;
    Party[] public parties;

    uint64[] public citizens;
    CitizenVote[] public citizenVotes;
    mapping(uint8 => uint8) public citizenPartyVote;
    mapping(string => uint8) public citizensStateWon;
    mapping(uint8 => uint8) public citizensPartyWon;

    Elector[] public electors;
    Elector[] public electedElectors;
    Elector[] public electedElectorsVoted;
    mapping(uint8 => uint16) public electorsVotes;

    function isThisChairPerson() public view returns(bool) {
        for (uint index = 0; index < chairPeople.length; index++) {
            if (chairPeople[index] == msg.sender) {
                return true;
            }
        }

        return false;
    }
    function getStatus() public view returns(Status) {
        return status;
    }
    function getPartyCount() public view returns(uint) {
        return parties.length;
    }
    function getStateCount() public view returns(uint) {
        return states.length;
    }
    function getPopularVoteWinner() public view returns(uint8) {
        uint64 count = 0;
        uint8 won = 0;

        for (uint8 index = 0; index < citizens.length; index++) {
            if (citizensPartyWon[index] > count) {
                won = index;
            }
        }

        return won;
    }
    function getElectoralVoteWinner() public view returns(uint8) {
        uint64 count = 0;
        uint8 won = 0;

        for (uint8 index = 0; index < citizens.length; index++) {
            if (electorsVotes[index] > count) {
                won = index;
            }
        }

        return won;
    }
    
    function setStatus(Status newStatus) public isChairPerson {
        if (status == Status.General && newStatus == Status.Electoral) {
            electElectors();
        }
        if (status == Status.Electoral && newStatus == Status.Finished) {
            require(electedElectorsVoted.length != electedElectors.length, "Not all elected electors has voted");
        }

        status = newStatus;
    }


    // Elect the electors by filling the electedElectors array.
    function electElectors() isChairPerson public {
        for (uint8 stateIndex = 0; stateIndex < states.length; stateIndex++) {
            string memory state = states[stateIndex];
            bytes32 stateHash = keccak256(abi.encodePacked(state));

            uint64 voteMax = 0;
            uint8 partyWon = 0;
            
//            for (uint8 partyIndex = 0; partyIndex < citizenStateVote[state].length; partyIndex++) {
//                if (citizensVotes[partyIndex] > voteMax) {
//                    voteMax = citizenStateVote[state][partyIndex];
//                    partyWon = partyIndex;
//                }
//            }

            citizensStateWon[state] = partyWon;
            citizensPartyWon[partyWon] += 1;

            for (uint8 electorIndex = 0; electorIndex < electors.length; electorIndex++) {
                Elector memory elector = electors[electorIndex];
                string memory _state = elector.state;
                bytes32 _stateHash = keccak256(abi.encodePacked(_state));

                if (stateHash == _stateHash && partyWon == elector.party) {
                    electedElectors.push(elector);
                    break;
                }
            }
        }
    }
    
    // The citizen will elect the electors.
    function citizenVote(uint64 id, uint8 party) public isOfficialPerson isStatus(Status.General) hasCitizenVote(id) {
        string memory state;
        
        for (uint index = 0; index < officalPeople.length; index++) {
            if (officalPeople[index].id == msg.sender) {
                state = officalPeople[index].state;
                break;
            }
        }

        citizens.push(id);
 //       citizenVotes.push(citizenVote(id, state, party));
    }
    // The elected electors will elect the president.
    function electorVote(uint64 id, uint8 party) public isOfficialPerson isStatus(Status.Electoral) isElectedElector(id) hasElectorVote(id) {
        for (uint index = 0; index < electedElectors.length; index++) {
            if (electedElectors[index].id == id) {
                electedElectorsVoted.push(electedElectors[index]);
                break;
            }
        }

        electorsVotes[party]++;
    }

    constructor() {
        chairPeople.push(msg.sender);
    }

    function addChairPerson(address id) public isChairPerson {
        chairPeople.push(id);
    }
    function addOfficialPerson(address id, string memory state) public isChairPerson {
        officalPeople.push(Official(id, state));
        addState(state);
    }
    function addState(string memory state) public isChairPerson {
        for (uint64 index = 0; index < states.length; index++) {
            bytes32 hashA = keccak256(abi.encodePacked(states[index]));
            bytes32 hashB = keccak256(abi.encodePacked(state));

            require(hashA != hashB, "State alreaedy existed");
        }
        
        states.push(state);
    }
    function addParty(uint64 id, string memory name, string memory image) public isChairPerson {
        parties.push(Party(id, name, image));
    }
    function addElector(uint64 id, string memory state, uint8 partyID) public isChairPerson {
        bytes32 hashA = keccak256(abi.encodePacked(state));
        
        for (uint index = 0; index < electors.length; index++) {
            if (electors[index].id == id) {
                break;
            }

            bytes32 hashB = keccak256(abi.encodePacked(state));

            if (partyID == electors[index].party && hashA == hashB) {
                break;
            }
            
        }
        
        electors.push(Elector(id, state, partyID));
    }

    modifier isStatus(Status toStatus) {
        require(status == toStatus, "Invalid Status");

        _;
    }

    modifier isChairPerson() {
        bool existed = false;

        for (uint index = 0; index < chairPeople.length; index++) {
            if (chairPeople[index] == msg.sender) {
                existed = true;
                break;
            }
        }
        
        require(existed, "Not an chairperson");
        
        _;
    }
    modifier isOfficialPerson() {
        bool existed = false;

        for (uint index = 0; index < officalPeople.length; index++) {
            if (officalPeople[index].id == msg.sender) {
                existed = true;
                break;
            }
        }
        
        require(existed, "Not an offical person");
        
        _;
    }
    modifier hasCitizenVote(uint64 id) {
        bool existed = false;

        for (uint index = 0; index < citizens.length; index++) {
            if (citizens[index] == id) {
                existed = true;
                break;
            }
        }
        
        require(!existed, "Already Voted");
        
        _;
    }
    modifier isElectedElector(uint64 id) {
        bool existed = false;

        for (uint index = 0; index < electedElectors.length; index++) {
            if (electedElectors[index].id == id) {
                existed = true;
                break;
            }
        }
        
        require(existed, "Not an elected elector");
        
        _;
    }
    modifier hasElectorVote(uint64 id) {
        bool existed = false;

        for (uint index = 0; index < electedElectorsVoted.length; index++) {
            if (electedElectorsVoted[index].id == id) {
                existed = true;
                break;
            }
        }
        
        require(!existed, "Already Voted");
        
        _;
    }


}