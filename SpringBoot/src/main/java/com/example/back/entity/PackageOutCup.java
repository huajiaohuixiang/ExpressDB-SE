package com.example.back.entity;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "PACKAGE_OUT_CUP", schema = "TEST", catalog = "")
public class PackageOutCup {
    private String packageId;
    private Time outDate;
    private String boxId;
    private String userId;
    private String messageId;

    @Id
    @Column(name = "PACKAGE_ID")
    public String getPackageId() {
        return packageId;
    }

    public void setPackageId(String packageId) {
        this.packageId = packageId;
    }

    @Basic
    @Column(name = "OUT_DATE")
    public Time getOutDate() {
        return outDate;
    }

    public void setOutDate(Time outDate) {
        this.outDate = outDate;
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
    @Column(name = "USER_ID")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

        PackageOutCup that = (PackageOutCup) o;

        if (packageId != null ? !packageId.equals(that.packageId) : that.packageId != null) return false;
        if (outDate != null ? !outDate.equals(that.outDate) : that.outDate != null) return false;
        if (boxId != null ? !boxId.equals(that.boxId) : that.boxId != null) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (messageId != null ? !messageId.equals(that.messageId) : that.messageId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = packageId != null ? packageId.hashCode() : 0;
        result = 31 * result + (outDate != null ? outDate.hashCode() : 0);
        result = 31 * result + (boxId != null ? boxId.hashCode() : 0);
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (messageId != null ? messageId.hashCode() : 0);
        return result;
    }
}
