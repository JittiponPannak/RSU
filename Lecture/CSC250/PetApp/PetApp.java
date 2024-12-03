import java.util.ArrayList;
import java.util.Scanner;

public class PetApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Pet> petList = new ArrayList();
        
        // 1. ดำเนินการรับข้อมูลชื่อของสัตว์เลี้ยง ทั้งสิ้น 3 ตัว
        // เพื่อสร้างสัตว์เลี้ยงทั้ง 3 ตัวและ บันทึกสัตว์ทั้ง 3 ตัวลงใน PetList
        System.out.print("Name your 1st Pet : ");
        petList.add(new Pet(sc.nextLine()));
        System.out.print("Name your 2nd Pet : ");
        petList.add(new Pet(sc.nextLine()));
        System.out.print("Name your 3rd Pet : ");
        petList.add(new Pet(sc.nextLine()));
        System.out.println();

        // 2. พิมพ์ รายชื่อของสัตว์เลี้ยงทั้ง 3 ตัวนั้นทางจอภาพ
        System.out.println("< Pet List >");
        for (Pet pet : petList)
            System.out.println(pet.getName());
        System.out.println();
        
        // 3. ทำการแก้ไขชื่อของสัตว์เลี้ยงตัวที่ 2 ของ PetList ( หมายถึง PetList[1] )
        System.out.print("Rename your 2nd Pet : ");
        petList.get(1).setName(sc.nextLine());
        System.out.println();

        // 4. พิมพ์ รายชื่อของสัตว์เลี้ยงทั้ง 3 ตัวนั้นทางจอภาพ
        System.out.println("< Pet List >");
        for (Pet pet : petList)
            System.out.println(pet.getName());
        System.out.println();
    }
}
class Pet {
    private String name;

    public String getName() { return name; }
    public void setName(String n) { name = n; }

    Pet(String n) { name = n; }
}

// 6606405 จิตติภณ พานนาค  
// 6606250 ภูรีภัทร ภู่ระย้า