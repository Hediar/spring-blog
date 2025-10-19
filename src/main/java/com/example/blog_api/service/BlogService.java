package com.example.blog_api.service;

import com.example.blog_api.domain.Article;
import com.example.blog_api.dto.AddArticleRequest;
import com.example.blog_api.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor // final이 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service
public class BlogService {
    private final BlogRepository blogRepository;

    // 블로그 글 추가 메서드
    public Article save(AddArticleRequest request) {
        return blogRepository.save(request.toEntity());
    }

    // 블로그 글 모두 조회
    public List<Article> findAll() {
        return blogRepository.findAll();
    }

    // 블로그 글 1개 조회
    public Article findById(long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));
    }
}
