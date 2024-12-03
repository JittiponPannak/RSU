public class Work2 {

}

class Person {
    private String socialSecurityNumber, firstName, middleName, lastName;
    
    public Person(String ssn, String firstName, String middleName, String lastName) {
        socialSecurityNumber = ssn;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }
    
    public String getSSN() { return socialSecurityNumber; }
    public String getFirstName() { return firstName; }
    public String getMiddleName() { return middleName; }
    public String getLastName() { return lastName; }

    public void setSocialSecurityNumber(String socialSecurityNumber) { this.socialSecurityNumber = socialSecurityNumber; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
}
class Student extends Person {
    private int collegeClass;
    
    public Student(String ssn, String firstName, String middleName, String lastName, int collegeClass) {
        super(ssn, firstName, middleName, lastName);;
        this.collegeClass = collegeClass;
    }

    public int getCollegeClass() { return collegeClass; }
    public void setCollegeClass(int collegeClass) { this.collegeClass = collegeClass; }

    @Override
    public String toString() {
        final String FORMAT = "SSN %s\n%s\nClass : %d\n\n"; 
        return String.format(FORMAT, this.getSSN(), this.getLastName(), this.getCollegeClass());
    }
}