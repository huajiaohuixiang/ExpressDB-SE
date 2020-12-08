package com.example.back.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Time;

@Entity
public class Coupons {
    private String couponsId;
    private Time dueDate;
    private double amount;
    private String userId;

    @Id
    @Column(name = "COUPONS_ID")
    public String getCouponsId() {
        return couponsId;
    }

    public void setCouponsId(String couponsId) {
        this.couponsId = couponsId;
    }

    @Basic
    @Column(name = "DUE_DATE")
    public Time getDueDate() {
        return dueDate;
    }

    public void setDueDate(Time dueDate) {
        this.dueDate = dueDate;
    }

    @Basic
    @Column(name = "AMOUNT")
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "USER_ID")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Coupons coupons = (Coupons) o;

        if (Double.compare(coupons.amount, amount) != 0) return false;
        if (couponsId != null ? !couponsId.equals(coupons.couponsId) : coupons.couponsId != null) return false;
        if (dueDate != null ? !dueDate.equals(coupons.dueDate) : coupons.dueDate != null) return false;
        if (userId != null ? !userId.equals(coupons.userId) : coupons.userId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = couponsId != null ? couponsId.hashCode() : 0;
        result = 31 * result + (dueDate != null ? dueDate.hashCode() : 0);
        temp = Double.doubleToLongBits(amount);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        return result;
    }
}
