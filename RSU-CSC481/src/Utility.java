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
                    image = new ImageIcon(image.getImage().getScaledInstance(
                            width, height, java.awt.Image.SCALE_AREA_AVERAGING));
                    imageCache.put(path, image);
                }
            }
        } catch (Exception e) { e.printStackTrace();}
        
        return image;
    }
    static ImageIcon getImageFromURL(String path, int width, int height) {
        ImageIcon image = null;
        
        try {
            if (path != null && !path.isEmpty()) {
                if (imageCache.containsKey(path)) {
                    image = imageCache.get(path);
                } else {
                    java.net.URL url = java.net.URI.create(path).toURL();
                    java.awt.image.BufferedImage c = javax.imageio.ImageIO.read(url);
                    image = new javax.swing.ImageIcon(c);
                    image = new ImageIcon(image.getImage().getScaledInstance(
                            width, height, java.awt.Image.SCALE_AREA_AVERAGING));
                    imageCache.put(path, image);
                }
            }
        } catch (Exception e) { e.printStackTrace();}
        
        return image;
    }    
}
