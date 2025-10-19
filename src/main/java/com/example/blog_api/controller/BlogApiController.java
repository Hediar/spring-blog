package com.example.blog_api.controller;

import com.example.blog_api.domain.Article;
import com.example.blog_api.dto.AddArticleRequest;
import com.example.blog_api.dto.ArticleResponse;
import com.example.blog_api.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor // final 필드로 생성자 자동 생성
@RestController // JSON 형식으로 반환하는 컨트롤러
public class BlogApiController {
    private final BlogService blogService; // 생성자 주입

    @PostMapping("/api/articles")
    // @RequestBody로 요청 본문 값 매핑
    public ResponseEntity<Article> addArticle(@RequestBody AddArticleRequest request) {
        Article savedArticle = blogService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedArticle);
    }

    @GetMapping("/api/articles")
    public ResponseEntity<List<ArticleResponse>> findAllArticles() {
        List<ArticleResponse> articles = blogService.findAll()
                .stream()
                .map(ArticleResponse::new) // 각 Article을 ArticleResponse로 변환(생성자 참조)
                .toList();
        return ResponseEntity.ok() // 상태코드 200
                .body(articles);  // JSON 배열 형태
    }
}
