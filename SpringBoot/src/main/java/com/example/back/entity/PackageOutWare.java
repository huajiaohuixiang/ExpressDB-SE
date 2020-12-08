package com.example.back.entity;

import javax.persistence.*;

@Entity
@Table(name = "PACKAGE_OUT_WARE", schema = "TEST", catalog = "")
@IdClass(PackageOutWarePK.class)
public class PackageOutWare {
    private String packageId;
    private String warehouseId;
    private String outDate;
    private String employeeId;
    private String boxId;
    private String messageId;

    @Id
    @Column(name = "PACKAGE_ID")
    public String getPackageId() {
        return packageId;
    }

    public void setPackageId(String packageId) {
        this.packageId = packageId;
    }

    @Id
    @Column(name = "WAREHOUSE_ID")
    public String getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(String warehouseId) {
        this.warehouseId = warehouseId;
    }

    @Basic
    @Column(name = "OUT_DATE")
    public String getOutDate() {
        return outDate;
    }

    public void setOutDate(String outDate) {
        this.outDate = outDate;
    }

    @Basic
    @Column(name = "EMPLOYEE_ID")
    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    @Basic
    @Column(name = "BOX_ID")
    public String getBoxId() {
        return boxId;
    }

    public void setBoxId(String boxId) {
        this.boxId = boxId;
    }

    @Basic
    @Column(name = "MESSAGE_ID")
    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PackageOutWare that = (PackageOutWare) o;

        if (packageId != null ? !packageId.equals(that.packageId) : that.packageId != null) return false;
        if (warehouseId != null ? !warehouseId.equals(that.warehouseId) : that.warehouseId != null) return false;
        if (outDate != null ? !outDate.equals(that.outDate) : that.outDate != null) return false;
        if (employeeId != null ? !employeeId.equals(that.employeeId) : that.employeeId != null) return false;
        if (boxId != null ? !boxId.equals(that.boxId) : that.boxId != null) return false;
        if (messageId != null ? !messageId.equals(that.messageId) : that.messageId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = packageId != null ? packageId.hashCode() : 0;
        result = 31 * result + (warehouseId != null ? warehouseId.hashCode() : 0);
        result = 31 * result + (outDate != null ? outDate.hashCode() : 0);
        result = 31 * result + (employeeId != null ? employeeId.hashCode() : 0);
        result = 31 * result + (boxId != null ? boxId.hashCode() : 0);
        result = 31 * result + (messageId != null ? messageId.hashCode() : 0);
        return result;
    }
}
