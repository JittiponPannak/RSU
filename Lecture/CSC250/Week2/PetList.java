package CSC250.Week2;

import java.util.ArrayList;

public class PetList {
    public static void main(String[] args) {
        ArrayList<Pet> arr = new ArrayList();
        Runnable test = () -> {
            System.out.println();
            for (int i = 0; i < arr.size(); i++)
             System.out.println(arr.get(i));
        };
        
        Pet pet1 = new Pet("Pet A");
        arr.add(pet1);
    }
}
