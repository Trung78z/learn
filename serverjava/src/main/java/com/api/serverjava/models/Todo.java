package com.api.serverjava.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "todojava")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String task;
    private String date;
    private String priority;
    private Boolean status;

    public Todo() {
    }

    public Todo(String task, String date, String priority, Boolean status) {
        this.task = task;
        this.date = date;
        this.priority = priority;
        this.status = status;
    }

    public Todo(Integer id, String task, String date, String priority, Boolean status) {
        this.id = id;
        this.task = task;
        this.date = date;
        this.priority = priority;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Todo [id=" + id + ", task=" + task + ", date=" + date + ", priority=" + priority + ", status=" + status
                + "]";
    }

}
