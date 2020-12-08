package com.example.back.entity;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "EX_ORDER", schema = "TEST", catalog = "")
public class ExOrder {
    private String orderId;
    private String senderName;
    private String sendPhone;
    private String sendAddress;
    private String company;
    private String receiverName;
    private String receiverAddress;
    private String receiverPhone;
    private String packageContent;
    private Time orderDate;
    private String weight;
    private String status;
    private String employeeId;

    @Id
    @Column(name = "ORDER_ID")
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    @Basic
    @Column(name = "SENDER_NAME")
    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    @Basic
    @Column(name = "SEND_PHONE")
    public String getSendPhone() {
        return sendPhone;
    }

    public void setSendPhone(String sendPhone) {
        this.sendPhone = sendPhone;
    }

    @Basic
    @Column(name = "SEND_ADDRESS")
    public String getSendAddress() {
        return sendAddress;
    }

    public void setSendAddress(String sendAddress) {
        this.sendAddress = sendAddress;
    }

    @Basic
    @Column(name = "COMPANY")
    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    @Basic
    @Column(name = "RECEIVER_NAME")
    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    @Basic
    @Column(name = "RECEIVER_ADDRESS")
    public String getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(String receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

    @Basic
    @Column(name = "RECEIVER_PHONE")
    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    @Basic
    @Column(name = "PACKAGE_CONTENT")
    public String getPackageContent() {
        return packageContent;
    }

    public void setPackageContent(String packageContent) {
        this.packageContent = packageContent;
    }

    @Basic
    @Column(name = "ORDER_DATE")
    public Time getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Time orderDate) {
        this.orderDate = orderDate;
    }

    @Basic
    @Column(name = "WEIGHT")
    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    @Basic
    @Column(name = "STATUS")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Basic
    @Column(name = "EMPLOYEE_ID")
    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ExOrder exOrder = (ExOrder) o;

        if (orderId != null ? !orderId.equals(exOrder.orderId) : exOrder.orderId != null) return false;
        if (senderName != null ? !senderName.equals(exOrder.senderName) : exOrder.senderName != null) return false;
        if (sendPhone != null ? !sendPhone.equals(exOrder.sendPhone) : exOrder.sendPhone != null) return false;
        if (sendAddress != null ? !sendAddress.equals(exOrder.sendAddress) : exOrder.sendAddress != null) return false;
        if (company != null ? !company.equals(exOrder.company) : exOrder.company != null) return false;
        if (receiverName != null ? !receiverName.equals(exOrder.receiverName) : exOrder.receiverName != null)
            return false;
        if (receiverAddress != null ? !receiverAddress.equals(exOrder.receiverAddress) : exOrder.receiverAddress != null)
            return false;
        if (receiverPhone != null ? !receiverPhone.equals(exOrder.receiverPhone) : exOrder.receiverPhone != null)
            return false;
        if (packageContent != null ? !packageContent.equals(exOrder.packageContent) : exOrder.packageContent != null)
            return false;
        if (orderDate != null ? !orderDate.equals(exOrder.orderDate) : exOrder.orderDate != null) return false;
        if (weight != null ? !weight.equals(exOrder.weight) : exOrder.weight != null) return false;
        if (status != null ? !status.equals(exOrder.status) : exOrder.status != null) return false;
        if (employeeId != null ? !employeeId.equals(exOrder.employeeId) : exOrder.employeeId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = orderId != null ? orderId.hashCode() : 0;
        result = 31 * result + (senderName != null ? senderName.hashCode() : 0);
        result = 31 * result + (sendPhone != null ? sendPhone.hashCode() : 0);
        result = 31 * result + (sendAddress != null ? sendAddress.hashCode() : 0);
        result = 31 * result + (company != null ? company.hashCode() : 0);
        result = 31 * result + (receiverName != null ? receiverName.hashCode() : 0);
        result = 31 * result + (receiverAddress != null ? receiverAddress.hashCode() : 0);
        result = 31 * result + (receiverPhone != null ? receiverPhone.hashCode() : 0);
        result = 31 * result + (packageContent != null ? packageContent.hashCode() : 0);
        result = 31 * result + (orderDate != null ? orderDate.hashCode() : 0);
        result = 31 * result + (weight != null ? weight.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (employeeId != null ? employeeId.hashCode() : 0);
        return result;
    }
}
