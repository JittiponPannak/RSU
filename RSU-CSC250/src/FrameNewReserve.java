
import com.github.lgooddatepicker.optionalusertools.DateTimeChangeListener;
import com.github.lgooddatepicker.zinternaltools.DateTimeChangeEvent;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import javax.swing.DefaultListModel;
import javax.swing.JOptionPane;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */

/**
 *
 * @author nemoz
 */
public class FrameNewReserve extends javax.swing.JFrame {

    DefaultListModel<String> courtListModel = new DefaultListModel<String>();
    Reservation reservation = new Reservation();
    
    public FrameNewReserve() {
        initComponents();
        
        FrameNewReserve self = this;
        dateBegin.addDateTimeChangeListener(new DateTimeChangeListener() {
            @Override public void dateOrTimeChanged(DateTimeChangeEvent dtce) {
                LocalDateTime newDateTime = dateBegin.getDateTimePermissive();
                
                if (newDateTime.isBefore(LocalDateTime.now())) {
                    newDateTime = LocalDateTime.now();
                } else if (newDateTime.isAfter(dateEnd.getDateTimePermissive())) {
                    dateEnd.datePicker.setDate(newDateTime.toLocalDate());
                    dateEnd.timePicker.setTime(newDateTime.toLocalTime());
                }
                
                reservation.dateStart = dateBegin.getDateTimePermissive().atZone(ZoneId.of("Asia/Bangkok")).toInstant();
                reservation.dateEnded = dateEnd.getDateTimePermissive().atZone(ZoneId.of("Asia/Bangkok")).toInstant();
                
                refreshTotal();
            }
        });
        dateEnd.addDateTimeChangeListener(new DateTimeChangeListener() {
            @Override public void dateOrTimeChanged(DateTimeChangeEvent dtce) {
                LocalDateTime newDateTime = dateEnd.getDateTimePermissive();
                if (newDateTime.isBefore(LocalDateTime.now())) {
                    newDateTime = LocalDateTime.now();
                } else if (newDateTime.isBefore(dateBegin.getDateTimePermissive())) {
                    dateBegin.datePicker.setDate(newDateTime.toLocalDate());
                    dateBegin.timePicker.setTime(newDateTime.toLocalTime());
                }
                reservation.dateStart = dateBegin.getDateTimePermissive().toInstant(ZoneOffset.MAX);
                reservation.dateEnded = dateEnd.getDateTimePermissive().toInstant(ZoneOffset.MAX);
                refreshTotal();
            }
        });
        
        dateBegin.getDateTimeChangeListeners().get(0).dateOrTimeChanged(null);
        dateEnd.getDateTimeChangeListeners().get(0).dateOrTimeChanged(null);
    }
    void refreshCourt() {
        courtListModel.removeAllElements();
        for (Court court : reservation.courts)
            courtListModel.addElement("" + court.courtID);
    }
    void refreshTotal() {
        reservation.updatePrice();
        totalField.setText("฿ %.2f".formatted(reservation.total));
    }
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        customerField = new javax.swing.JTextField();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        customerSelect = new javax.swing.JButton();
        dateBegin = new com.github.lgooddatepicker.components.DateTimePicker();
        dateEnd = new com.github.lgooddatepicker.components.DateTimePicker();
        jLabel4 = new javax.swing.JLabel();
        totalField = new javax.swing.JTextField();
        jScrollPane1 = new javax.swing.JScrollPane();
        courtList = new javax.swing.JList<>();
        jLabel5 = new javax.swing.JLabel();
        cancel = new javax.swing.JButton();
        proceed = new javax.swing.JButton();
        courtAdd = new javax.swing.JButton();
        courtRemove = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setResizable(false);

        customerField.setEditable(false);
        customerField.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        jLabel1.setText("Customer");
        jLabel1.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        jLabel2.setText("Date Begin");
        jLabel2.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        jLabel3.setText("Date Ended");
        jLabel3.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        customerSelect.setText("Select");
        customerSelect.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        customerSelect.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                customerSelectActionPerformed(evt);
            }
        });

        dateBegin.datePicker.setDate(java.time.LocalDate.now());
        dateBegin.timePicker.setTime(java.time.LocalTime.now());
        dateBegin.setFont(jLabel1.getFont());
        dateBegin.datePicker.setFont(jLabel1.getFont());
        dateBegin.timePicker.setFont(jLabel1.getFont());

        dateEnd.datePicker.setDate(java.time.LocalDate.now());
        dateEnd.timePicker.setTime(java.time.LocalTime.now().plusHours(1));

        dateEnd.setFont(jLabel1.getFont());
        dateEnd.datePicker.setFont(jLabel1.getFont());
        dateEnd.timePicker.setFont(jLabel1.getFont());

        jLabel4.setText("Total Cost");
        jLabel4.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        totalField.setEditable(false);
        totalField.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        courtList.setModel(courtListModel);
        courtList.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        courtList.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jScrollPane1.setViewportView(courtList);

        jLabel5.setText("Courts");
        jLabel5.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        cancel.setText("Cancel");
        cancel.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        cancel.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cancelActionPerformed(evt);
            }
        });

        proceed.setText("Proceed");
        proceed.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        proceed.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                proceedActionPerformed(evt);
            }
        });

        courtAdd.setText("Add");
        courtAdd.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        courtAdd.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                courtAddActionPerformed(evt);
            }
        });

        courtRemove.setText("Remove");
        courtRemove.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        courtRemove.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                courtRemoveActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(customerField, javax.swing.GroupLayout.PREFERRED_SIZE, 200, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(customerSelect))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(dateEnd, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(dateBegin, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel4, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel5, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jScrollPane1, javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(totalField)))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGap(0, 0, Short.MAX_VALUE)
                        .addComponent(courtAdd, javax.swing.GroupLayout.PREFERRED_SIZE, 137, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(courtRemove, javax.swing.GroupLayout.PREFERRED_SIZE, 137, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(cancel, javax.swing.GroupLayout.PREFERRED_SIZE, 190, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(proceed, javax.swing.GroupLayout.PREFERRED_SIZE, 190, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 0, Short.MAX_VALUE)))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(customerField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(customerSelect))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jLabel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(dateBegin, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jLabel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(dateEnd, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel4, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(totalField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel5, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 220, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(courtAdd)
                    .addComponent(courtRemove))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(cancel)
                    .addComponent(proceed))
                .addContainerGap())
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void customerSelectActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_customerSelectActionPerformed
        setVisible(false);
        FrameNewReserve self = this;
        FrameMember frame = new FrameMember() { @Override public void dispose() {
            self.reservation.customer = customer;
            self.setVisible(true); super.dispose();
            if (customer != null) {
                customerField.setText("%s (%s)".formatted(customer.name, customer.phone));
                refreshTotal();
            }
        } };
        frame.setVisible(true);
    }//GEN-LAST:event_customerSelectActionPerformed

    private void cancelActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cancelActionPerformed
        setVisible(false); dispose();
    }//GEN-LAST:event_cancelActionPerformed

    private void proceedActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_proceedActionPerformed
        if (reservation.courts.isEmpty()) return;
        if (reservation.customer == null)  return;
        if (reservation.dateStart == null)  return;
        if (reservation.dateEnded == null) return;
        
        Main.reservations.add(reservation);
        
        setVisible(false); dispose();
    }//GEN-LAST:event_proceedActionPerformed

    private void courtAddActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_courtAddActionPerformed
        if (reservation.dateStart == null) { return; }
        
        String input = JOptionPane.showInputDialog("Court ID");
        int key = 0;
        
        try {
            if (input != null && !input.isEmpty())
                key = Integer.parseInt(input);
            if (key < 0 || key >= Main.courts.size()) {
                JOptionPane.showMessageDialog(null, "Invalid Court ID", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }
            
            Court court = Main.courts.get(key);
            if (reservation.courts.contains(court)) {
                JOptionPane.showMessageDialog(null, "Already Added", "Error", JOptionPane.ERROR_MESSAGE); return;
            } else {
                for (Reservation res : Main.reservations) {
                    if (res.courts.contains(court) && (reservation.dateStart.isAfter(res.dateStart) 
                                                       && reservation.dateEnded.isBefore(res.dateEnded)))
                    { JOptionPane.showMessageDialog(null, "Already Reserved At That Time", "Error", JOptionPane.ERROR_MESSAGE); return; }}
            }
            
            reservation.courts.add(court);
            refreshCourt();
            refreshTotal();
        } catch (Exception e) { e.printStackTrace(); }
        
    }//GEN-LAST:event_courtAddActionPerformed

    private void courtRemoveActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_courtRemoveActionPerformed
        int selected = courtList.getSelectedIndex();
        if (selected == -1) { return; }
        
        reservation.courts.remove(selected);
        refreshCourt();
        refreshTotal();
    }//GEN-LAST:event_courtRemoveActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(FrameNewReserve.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(FrameNewReserve.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(FrameNewReserve.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(FrameNewReserve.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new FrameNewReserve().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton cancel;
    private javax.swing.JButton courtAdd;
    private javax.swing.JList<String> courtList;
    private javax.swing.JButton courtRemove;
    private javax.swing.JTextField customerField;
    private javax.swing.JButton customerSelect;
    private com.github.lgooddatepicker.components.DateTimePicker dateBegin;
    private com.github.lgooddatepicker.components.DateTimePicker dateEnd;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JButton proceed;
    private javax.swing.JTextField totalField;
    // End of variables declaration//GEN-END:variables
}
