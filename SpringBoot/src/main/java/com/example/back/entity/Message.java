package com.example.back.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Time;

@Entity
public class Message {
    private String messageId;
    private Time sendDate;
    private String userId;
    private String content;

    @Id
    @Column(name = "MESSAGE_ID")
    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    @Basic
    @Column(name = "SEND_DATE")
    public Time getSendDate() {
        return sendDate;
    }

    public void setSendDate(Time sendDate) {
        this.sendDate = sendDate;
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
    @Column(name = "CONTENT")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Message message = (Message) o;

        if (messageId != null ? !messageId.equals(message.messageId) : message.messageId != null) return false;
        if (sendDate != null ? !sendDate.equals(message.sendDate) : message.sendDate != null) return false;
        if (userId != null ? !userId.equals(message.userId) : message.userId != null) return false;
        if (content != null ? !content.equals(message.content) : message.content != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = messageId != null ? messageId.hashCode() : 0;
        result = 31 * result + (sendDate != null ? sendDate.hashCode() : 0);
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }
}
