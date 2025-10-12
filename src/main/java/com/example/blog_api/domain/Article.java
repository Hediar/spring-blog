package com.example.blog_api.domain;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
public class Article {
    @Id // id가 기본키
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 자동 증가
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Builder // 빌더 패턴으로 객체 생성 (게터, 세터 생략가능)
    public Article(String title, String content) {
        this.title = title;
        this.content = content;
    }

    protected Article() {} // 기본 생성자

}
