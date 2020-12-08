package com.example.back.mapper;

import com.example.back.entity.Cupboard;
import org.apache.ibatis.annotations.Select;

import java.util.LinkedList;

public interface CupboardMapper {

    @Select("select * from cupboard")
    public LinkedList<Cupboard> getCupBoard();
}
