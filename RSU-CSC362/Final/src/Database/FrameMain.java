package Database;

import java.util.ArrayList;
import javax.swing.DefaultComboBoxModel;
import javax.swing.event.TableModelEvent;
import javax.swing.event.TableModelListener;
import javax.swing.table.DefaultTableModel;

public class FrameMain extends javax.swing.JFrame {

    static FrameMain instance;
    
    DefaultComboBoxModel<String> categoryModel = new DefaultComboBoxModel();
    DefaultTableModel itemModel;
    
    public FrameMain() {
        refresh();
        
        instance = this;
        initComponents();
        
        itemModel.setRowCount(0);
        categoryComboActionPerformed(null);
        
        itemModel.addTableModelListener(new TableModelListener() {
            @Override public void tableChanged(TableModelEvent e) {
                int selectedRow = itemTable.getSelectedRow();
                if (selectedRow != -1 && itemTable.getRowCount() > selectedRow) {
                    Item item = Database.instance.items.get(Item.getUID(
                            (int) itemModel.getValueAt(selectedRow, 0),
                            (int) itemModel.getValueAt(selectedRow, 1)));

                    item.name = (String) itemModel.getValueAt(selectedRow, 2);
                    item.price = (double) itemModel.getValueAt(selectedRow, 3);
                    item.available = (int) itemModel.getValueAt(selectedRow, 4);

                    Database.instance.updateItem(item);
                }
            }});
    }
    
    void refresh() {
        Database.instance.refreshCategory();
        Database.instance.refreshItem();
        Database.instance.refreshOrder();
        Database.instance.refreshRestock();
        Database.instance.refreshDelivery();
        Database.instance.refreshSupplier();
        
        categoryModel.removeAllElements();
        for (Category category : Database.instance.categories.values())
            categoryModel.addElement(category.name);
    }
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        itemTable = new javax.swing.JTable();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        IDField = new javax.swing.JTextField();
        categoryCombo = new javax.swing.JComboBox<>();
        search = new javax.swing.JButton();
        jSeparator1 = new javax.swing.JSeparator();
        newOrder = new javax.swing.JButton();
        refresh = new javax.swing.JButton();
        newRestock = new javax.swing.JButton();
        newDelivery = new javax.swing.JButton();
        refresh1 = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);

        itemTable.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        itemTable.getTableHeader().setFont(itemTable.getFont());
        itemTable.setRowHeight(30);
        itemTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "ID", "SubID", "Name", "Price", "Available"
            }
        ) {
            Class[] types = new Class [] {
                java.lang.Integer.class, java.lang.Integer.class, java.lang.String.class, java.lang.Double.class, java.lang.Integer.class
            };
            boolean[] canEdit = new boolean [] {
                false, false, true, true, true
            };

            public Class getColumnClass(int columnIndex) {
                return types [columnIndex];
            }

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        itemModel = (DefaultTableModel) itemTable.getModel();
        jScrollPane1.setViewportView(itemTable);
        if (itemTable.getColumnModel().getColumnCount() > 0) {
            itemTable.getColumnModel().getColumn(0).setMaxWidth(50);
            itemTable.getColumnModel().getColumn(1).setMaxWidth(50);
            itemTable.getColumnModel().getColumn(3).setMaxWidth(100);
            itemTable.getColumnModel().getColumn(4).setMaxWidth(100);
        }

        jLabel2.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel2.setText("ประเภท");

        jLabel3.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        jLabel3.setText("ID");

        IDField.setColumns(5);
        IDField.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        IDField.setText("0");

        categoryCombo.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        categoryCombo.setModel(categoryModel);
        categoryCombo.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                categoryComboActionPerformed(evt);
            }
        });

        search.setFont(new java.awt.Font("Cordia New", 0, 18)); // NOI18N
        search.setText("ค้นหา");
        search.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                searchActionPerformed(evt);
            }
        });

        newOrder.setFont(new java.awt.Font("Cordia New", 0, 24)); // NOI18N
        newOrder.setText("ออเดอร์ใหม่");
        newOrder.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                newOrderActionPerformed(evt);
            }
        });

        refresh.setFont(new java.awt.Font("Cordia New", 0, 24)); // NOI18N
        refresh.setText("รีเฟรช");
        refresh.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                refreshActionPerformed(evt);
            }
        });

        newRestock.setFont(new java.awt.Font("Cordia New", 0, 24)); // NOI18N
        newRestock.setText("รีสต็อคใหม่");
        newRestock.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                newRestockActionPerformed(evt);
            }
        });

        newDelivery.setFont(new java.awt.Font("Cordia New", 0, 24)); // NOI18N
        newDelivery.setText("การส่งของ");
        newDelivery.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                newDeliveryActionPerformed(evt);
            }
        });

        refresh1.setFont(new java.awt.Font("Cordia New", 0, 24)); // NOI18N
        refresh1.setText("ออเดอร์");
        refresh1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                refresh1ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jSeparator1, javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jScrollPane1)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jLabel2)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(categoryCombo, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel3)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(IDField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(search, javax.swing.GroupLayout.PREFERRED_SIZE, 76, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addContainerGap())
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(newOrder, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(newRestock, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(newDelivery, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(refresh, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(refresh1, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(0, 3, Short.MAX_VALUE))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(newOrder, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(newRestock, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(refresh, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(refresh1, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(0, 8, Short.MAX_VALUE))))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(45, 45, 45)
                        .addComponent(newDelivery, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                        .addComponent(search)
                        .addGroup(layout.createSequentialGroup()
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(jLabel3)
                                .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 26, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGap(6, 6, 6))
                        .addComponent(categoryCombo, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(IDField, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 370, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void searchActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_searchActionPerformed
        try {
            int id = Integer.parseInt(IDField.getText());
            
            Item[] items = Database.instance.items.values().toArray(new Item[Database.instance.items.size()]);
            java.util.Arrays.sort(items, new ItemComparator());
            
            int categoryID = 0;
            
            itemModel.setRowCount(0);
            for (Item item : items) {
                if (item.id == id) {
                    categoryID = item.categoryID;
                    itemModel.addRow(new Object[] { item.id, item.subID, item.name, item.price, item.available });
                }
            }
            
            categoryCombo.setSelectedIndex(Math.max(categoryID - 1, 0));
            
        } catch(Exception e) {
            categoryComboActionPerformed(null);
            e.printStackTrace();
        }
    }//GEN-LAST:event_searchActionPerformed
    private void categoryComboActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_categoryComboActionPerformed
        try {
            int category = categoryCombo.getSelectedIndex() + 1;
            
            Item[] items = Database.instance.items.values().toArray(new Item[Database.instance.items.size()]);
            java.util.Arrays.sort(items, new ItemComparator());
            
            itemModel.setRowCount(0);
            for (Item item : items) {
                if (item.categoryID == category) {
                    itemModel.addRow(new Object[] { item.id, item.subID, item.name, item.price, item.available });
                }
            }
            
            IDField.setText("0");
        } catch(Exception e) {
            e.printStackTrace();
        }
    }//GEN-LAST:event_categoryComboActionPerformed

    private void refreshActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_refreshActionPerformed
        refresh();
    }//GEN-LAST:event_refreshActionPerformed

    private void newDeliveryActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_newDeliveryActionPerformed
        setVisible(false);
        new FrameNewDelivery(){
            @Override public void dispose() {
                instance.setVisible(true);
                super.dispose();
                refresh();
            }
        }.setVisible(true);
    }//GEN-LAST:event_newDeliveryActionPerformed

    private void refresh1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_refresh1ActionPerformed
        setVisible(false);
        new FrameOrderList(){
            @Override public void dispose() {
                instance.setVisible(true);
                super.dispose();
                refresh();
            }
        }.setVisible(true);
    }//GEN-LAST:event_refresh1ActionPerformed

    private void newRestockActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_newRestockActionPerformed
        setVisible(false);
        new FrameNewRestock(){
            @Override public void dispose() {
                instance.setVisible(true);
                super.dispose();
                refresh();
            }
        }.setVisible(true);
    }//GEN-LAST:event_newRestockActionPerformed

    private void newOrderActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_newOrderActionPerformed
        setVisible(false);
        new FrameNewOrder(){
            @Override public void dispose() {
                instance.setVisible(true);
                super.dispose();
                refresh();
            }
        }.setVisible(true);
    }//GEN-LAST:event_newOrderActionPerformed

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
            java.util.logging.Logger.getLogger(FrameMain.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(FrameMain.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(FrameMain.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(FrameMain.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new FrameMain().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTextField IDField;
    private javax.swing.JComboBox<String> categoryCombo;
    private javax.swing.JTable itemTable;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JSeparator jSeparator1;
    private javax.swing.JButton newDelivery;
    private javax.swing.JButton newOrder;
    private javax.swing.JButton newRestock;
    private javax.swing.JButton refresh;
    private javax.swing.JButton refresh1;
    private javax.swing.JButton search;
    // End of variables declaration//GEN-END:variables
}
