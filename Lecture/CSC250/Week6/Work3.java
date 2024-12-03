public class Work3 {
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.aDescription();
        cat.aDescription(1);

        Dog dog = new Dog();
        dog.aDescription();
    }
}

class Animal {
    int aType = 0;
    
    void aDescription() { System.out.println("This is an Animal."); }
}
class Cat extends Animal {
    String aType = "Cat";
    
    void aDescription() { System.out.println("This is an Cat."); }
    void aDescription(int aType) { System.out.println("This is an " + aType); }
}
class Dog extends Animal {
    int aType = 1;
    
    void aDescription() { System.out.println(super.aType + " , " + this.aType); }
}