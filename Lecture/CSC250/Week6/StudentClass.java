public class StudentClass {
    public static void main(String[] args) {
        Student student = new Student("1234567891234", "John", "Nate", "Fallout", 0);
        System.out.println(student);
        student.setLastName(javax.swing.JOptionPane.showInputDialog("New Lastname : "));
        System.out.println(student);
    }
}
