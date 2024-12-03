/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package Database;

import static Database.FrameMain.instance;
import javax.swing.table.DefaultTableModel;

/**
 *
 * @author nemoz
 */
public class FrameNewDelivery extends javax.swing.JFrame {

    DefaultTableModel itemModel;
    int mode = 0;
    
    public FrameNewDelivery() {
        initComponents();
        itemModel.setRowCount(0);
        Database.instance.refreshDelivery();
        modeComboActionPerformed(null);     
    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        search1 = new javax.swing.JButton();
        jScrollPane1 = new javax.swing.JScrollPane();
        itemTable = new javax.swing.JTable();
        modeCombo = new javax.swing.JComboBox<>();
        search3 = new javax.swing.JButton();
        search4 = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);

        search1.setFont(new java.awt.Font("Cordia New", 0, 36)); // NOI18N
        search1.setText("ยกเลิก");
        search1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                search1ActionPerformed(evt);
            }
        });

        itemTable.setFont(new java.awt.Font("Cordia New", 0, 24)); // NOI18N
        itemTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null},
                {null, null, null},
                {null, null, null},
                {null, null, null}
            },
            new String [] {
                "Delivery ID", "Order ID", "Order Date"
            }
        ) {
            Class[] types = new Class [] {
                java.lang.Integer.class, java.lang.Integer.class, java.lang.String.class
            };
            boolean[] canEdit = new boolean [] {
                false, false, false
            };

            public Class getColumnClass(int columnIndex) {
                return types [columnIndex];
            }

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        itemModel = (DefaultTableModel) itemTable.getModel();
        itemTable.getTableHeader().setFont(itemTable.getFont());
        itemTable.setRowHeight(30);
        jScrollPane1.setViewportView(itemTable);

        modeCombo.setFont(new java.awt.Font("Cordia New", 0, 24)); // NOI18N
        modeCombo.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "ยังไม่เสร็จสิ้น", "เสร็จสิ้น" }));
        modeCombo.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                modeComboActionPerformed(evt);
            }
        });

        search3.setFont(new java.awt.Font("Cordia New", 0, 36)); // NOI18N
        search3.setText("สำเร็จ");
        search3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                search3ActionPerformed(evt);
            }
        });

        search4.setFont(new java.awt.Font("Cordia New", 0, 36)); // NOI18N
        search4.setText("ดูรายการ");
        search4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                search4ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(search4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(modeCombo, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, 450, Short.MAX_VALUE)
                    .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                        .addComponent(search1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(search3, javax.swing.GroupLayout.PREFERRED_SIZE, 220, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(modeCombo)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 340, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(search3, javax.swing.GroupLayout.PREFERRED_SIZE, 54, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(search1))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(search4, javax.swing.GroupLayout.PREFERRED_SIZE, 54, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void modeComboActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_modeComboActionPerformed
        mode = modeCombo.getSelectedIndex();
        
        itemModel.setRowCount(0);
        for (Delivery delivery : Database.instance.deliveries.values()) {
            switch (mode) {
                case 0:
                    if (delivery.date == null)
                        itemModel.addRow(new Object[] { delivery.id, delivery.orderID, delivery.date});
                    break;
                case 1:
                    if (delivery.date != null)
                        itemModel.addRow(new Object[] { delivery.id, delivery.orderID, delivery.date});
                    break;
            }
        }
    }//GEN-LAST:event_modeComboActionPerformed

    private void search1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_search1ActionPerformed
        int id = itemTable.getSelectedRow();
        if (id != -1) {
            Database.instance.deliveries.get((int) itemTable.getValueAt(id, 0)).date = null;
            Database.instance.updateDelivery(Database.instance.deliveries.get((int) itemTable.getValueAt(id, 0)));
            
            modeComboActionPerformed(null);
        }
    }//GEN-LAST:event_search1ActionPerformed

    private void search3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_search3ActionPerformed
        int id = itemTable.getSelectedRow();
        if (id != -1) {
            Database.instance.deliveries.get((int) itemTable.getValueAt(id, 0)).date = java.sql.Date.valueOf(java.time.LocalDate.now());
            Database.instance.updateDelivery(Database.instance.deliveries.get((int) itemTable.getValueAt(id, 0)));
            
            modeComboActionPerformed(null);
        }
    }//GEN-LAST:event_search3ActionPerformed

    private void search4ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_search4ActionPerformed
        int id = itemTable.getSelectedRow();
        if (id != -1) {
            setVisible(false);
            new FrameOrderList((int) itemTable.getValueAt(id, 1)){
                @Override public void dispose() {
                    instance.setVisible(true);
                    super.dispose();
                }
            }.setVisible(true);
        }
    }//GEN-LAST:event_search4ActionPerformed

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
            java.util.logging.Logger.getLogger(FrameNewDelivery.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(FrameNewDelivery.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(FrameNewDelivery.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(FrameNewDelivery.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new FrameNewDelivery().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTable itemTable;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JComboBox<String> modeCombo;
    private javax.swing.JButton search1;
    private javax.swing.JButton search3;
    private javax.swing.JButton search4;
    // End of variables declaration//GEN-END:variables
}
