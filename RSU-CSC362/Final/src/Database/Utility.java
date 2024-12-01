/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Database;

import java.util.Comparator;

public class Utility {
    
}

class ItemComparator implements Comparator<Item> {
    @Override public int compare(Item o1, Item o2) {
        int result = Integer.compare(o1.id, o2.id);
        
        if (result == 0)
          result = Integer.compare(o1.subID, o2.subID);
        
        return result;
    }
}