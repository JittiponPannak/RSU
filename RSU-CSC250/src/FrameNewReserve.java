
import com.github.lgooddatepicker.optionalusertools.DateTimeChangeListener;
import com.github.lgooddatepicker.zinternaltools.DateTimeChangeEvent;
import java.time.LocalDateTime;
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
                if (newDateTime.isAfter(dateEnd.getDateTimePermissive())) {
                    dateEnd.datePicker.setDate(newDateTime.toLocalDate());
                    dateEnd.timePicker.setTime(newDateTime.toLocalTime());
                }
                reservation.dateStart = dateBegin.getDateTimePermissive().toInstant(ZoneOffset.MAX);
                reservation.dateEnded = dateEnd.getDateTimePermissive().toInstant(ZoneOffset.MAX);
                refreshTotal();
            }
        });
        dateEnd.addDateTimeChangeListener(new DateTimeChangeListener() {
            @Override public void dateOrTimeChanged(DateTimeChangeEvent dtce) {
                LocalDateTime newDateTime = dateEnd.getDateTimePermissive();
                if (newDateTime.isBefore(dateBegin.getDateTimePermissive())) {
                    dateBegin.datePicker.setDate(newDateTime.toLocalDate());
                    dateBegin.timePicker.setTime(newDateTime.toLocalTime());
                }
                reservation.dateStart = dateBegin.getDateTimePermissive().toInstant(ZoneOffset.MAX);
                reservation.dateEnded = dateEnd.getDateTimePermissive().toInstant(ZoneOffset.MAX);
                refreshTotal();
            }
        });
    }
    void refreshCourt() {
        courtListModel.removeAllElements();
        for (Court court : reservation.courts)
            courtListModel.addElement("" + court.courtID);
    }
    void refreshTotal() {
        reservation.updatePrice();
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
        jLabel6 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setResizable(false);

        customerField.setEditable(false);
        customerField.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        jLabel1.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel1.setText("Customer");

        jLabel2.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel2.setText("Date Begin");

        jLabel3.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel3.setText("Date Ended");

        customerSelect.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        customerSelect.setText("Select");
        customerSelect.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                customerSelectActionPerformed(evt);
            }
        });

        dateBegin.datePicker.setDate(java.time.LocalDate.now());
        dateBegin.timePicker.setTime(java.time.LocalTime.now());

        dateEnd.datePicker.setDate(java.time.LocalDate.now());
        dateEnd.timePicker.setTime(java.time.LocalTime.now());

        jLabel4.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel4.setText("Total Cost");

        totalField.setEditable(false);
        totalField.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N

        courtList.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        courtList.setModel(courtListModel);
        courtList.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        jScrollPane1.setViewportView(courtList);

        jLabel5.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel5.setText("Courts");

        cancel.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        cancel.setText("Cancel");
        cancel.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cancelActionPerformed(evt);
            }
        });

        proceed.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        proceed.setText("Proceed");
        proceed.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                proceedActionPerformed(evt);
            }
        });

        courtAdd.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        courtAdd.setText("Add");
        courtAdd.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                courtAddActionPerformed(evt);
            }
        });

        courtRemove.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        courtRemove.setText("Remove");
        courtRemove.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                courtRemoveActionPerformed(evt);
            }
        });

        jLabel6.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel6.setHorizontalAlignment(javax.swing.SwingConstants.RIGHT);
        jLabel6.setText("*Leave Empty For Guest");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel6, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
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
                .addComponent(jLabel6)
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
            self.reservation.customer = customer; self.setVisible(true); super.dispose();
            if (customer != null) { customerField.setText("%s (%s)".formatted(customer.name, customer.phone)); }
        } };
        frame.setVisible(true);
    }//GEN-LAST:event_customerSelectActionPerformed

    private void cancelActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cancelActionPerformed
        setVisible(false); dispose();
    }//GEN-LAST:event_cancelActionPerformed

    private void proceedActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_proceedActionPerformed
        if (reservation.courts.isEmpty()) return;
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
            
            
            Court court = Main.courts.get(key); /*
            if (reservation.courts.contains(court)) {
                JOptionPane.showMessageDialog(null, "Already Added", "Error", JOptionPane.ERROR_MESSAGE);
            } else {
                for (Reservation res : Main.reservations) {
                if (!res.courts.contains(court) && (!res.dateStart.isBefore(reservation.dateStart) || !res.dateEnded.isAfter(reservation.dateEnded))) { return; }}
            }
            */
            
            reservation.courts.add(court);
            refreshCourt();
        } catch (Exception e) { e.printStackTrace(); }
        
    }//GEN-LAST:event_courtAddActionPerformed

    private void courtRemoveActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_courtRemoveActionPerformed
        int selected = courtList.getSelectedIndex();
        if (selected == -1) { return; }
        
        reservation.courts.remove(selected);
        refreshCourt();
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
    private javax.swing.JLabel jLabel6;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JButton proceed;
    private javax.swing.JTextField totalField;
    // End of variables declaration//GEN-END:variables
}
