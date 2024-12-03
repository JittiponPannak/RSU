import java.awt.HeadlessException;
import java.util.HashMap;
import javax.swing.ImageIcon;
import javax.swing.JFrame;

public class Utility {
    static HashMap<String, ImageIcon> imageCache = new HashMap();
    static ImageIcon getImageLocal(Class c, String path, int width, int height) {
        ImageIcon image = null;
        try {
            if (path != null && !path.isEmpty()) {
                if (imageCache.containsKey(path)) {
                    image = imageCache.get(path);
                } else {
                    image = new ImageIcon(c.getResource(path));
                    imageCache.put(path, image);
                }
                return new ImageIcon(image.getImage().getScaledInstance(
                        width, height, java.awt.Image.SCALE_AREA_AVERAGING));
            }
        } catch (Exception e) { e.printStackTrace();}
        
        return null;
    }
    static ImageIcon getImageFromURL(String path) {
        ImageIcon image = null;
        
        try {
            if (path != null && !path.isEmpty()) {
                if (imageCache.containsKey(path)) {
                    image = imageCache.get(path);
                } else {
                    java.net.URL url = java.net.URI.create(path).toURL();
                    java.awt.image.BufferedImage c = javax.imageio.ImageIO.read(url);
                    image = new javax.swing.ImageIcon(c);
                    imageCache.put(path, image);
                }
                return image;
            }
        } catch (Exception e) { e.printStackTrace();}
        
        return null;
    }
    static ImageIcon getImageFromURL(String path, int width, int height) {
        ImageIcon image = null;
        
        try {
                image = getImageFromURL(path);
                
                int Cwidth = image.getImage().getWidth(image.getImageObserver());
                int Cheight = image.getImage().getHeight(image.getImageObserver());
                
                if (Cwidth != width && Cheight != height) {
                    image = new ImageIcon(image.getImage().getScaledInstance(
                            width, height, java.awt.Image.SCALE_AREA_AVERAGING));
                    imageCache.put(path, image);
                }
                
                return image;
        } catch (Exception e) { e.printStackTrace();}
        
        return null;
    }    
    static void setImageToLabelFromURL(javax.swing.JLabel label, String path) {
        Thread.startVirtualThread(new java.lang.Runnable() {
            @Override public void run() {
                label.setIcon(getImageLocal(label.getClass(), "/data/SampleQR.png", label.getWidth(), label.getHeight()));
                label.setIcon(getImageFromURL(path));
            }
        });
    }
}
