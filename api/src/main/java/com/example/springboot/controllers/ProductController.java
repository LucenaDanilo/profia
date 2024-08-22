package com.example.springboot.controllers;

import com.example.springboot.dto.ProductRecordDto;
import com.example.springboot.enums.UserRole;
import com.example.springboot.models.ProductModel;
import com.example.springboot.models.Student;
import com.example.springboot.models.UserModel;
import com.example.springboot.repository.ProductRepository;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.UserRepository;
import jakarta.validation.Valid;
import org.apache.catalina.Store;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
@CrossOrigin("*")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @GetMapping("/products")
    public ResponseEntity<List<ProductModel>> getAllProducts(){
        List<ProductModel> productsList = productRepository.findAll();
        if(!productsList.isEmpty()) {
            for(ProductModel product : productsList) {
                UUID id = product.getIdProduct();
                product.add(linkTo(methodOn(ProductController.class).getOneProduct(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(productsList);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Object> getOneProduct(@PathVariable(value="id") UUID id){
        Optional<ProductModel> productO = productRepository.findById(id);
        if(productO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        }
        productO.get().add(linkTo(methodOn(ProductController.class).getAllProducts()).withRel("Products List"));
        return ResponseEntity.status(HttpStatus.OK).body(productO.get());
    }

    @PostMapping("/products")
    public ResponseEntity<ProductModel> saveProduct(@RequestBody @Valid ProductRecordDto productRecordDto) {
        var productModel = new ProductModel();

        BeanUtils.copyProperties(productRecordDto, productModel);

        System.out.println(productModel.getValue());
        System.out.println(productRecordDto.getValue());

        return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(productModel));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable(value="id") UUID id) {
        Optional<ProductModel> productO = productRepository.findById(id);
        if(productO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        }
        productRepository.delete(productO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully.");
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable(value="id") UUID id,
                                                @RequestBody @Valid ProductRecordDto productRecordDto) {
        Optional<ProductModel> productO = productRepository.findById(id);
        if(productO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        }
        var productModel = productO.get();
        BeanUtils.copyProperties(productRecordDto, productModel);
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.save(productModel));
    }


    @Autowired
    private RestTemplate restTemplate;

//    @Secured("ROLE_USER")
    @PostMapping("/products/resgatar")
    public ResponseEntity<String> resgatar(@RequestBody Map<String, String> body) {
        // Recupera o UserModel do principal
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Student user = (Student) authentication.getPrincipal();

        String productId = body.get("productId");
        Optional<ProductModel> productOptional = productRepository.findById(UUID.fromString(productId));

        if (productOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }

        ProductModel productModel = productOptional.get();

        if (user.getPoints() < productModel.getValue()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Pontos insuficientes.");
        }

        // Defina os dados a serem enviados para o endpoint externo
        Map<String, Object> externalRequestBody = new HashMap<>();
        externalRequestBody.put("nome", user.getName());
        externalRequestBody.put("link", productModel.getLink());
        // Adicione outros dados se necessário

        // Envie o POST para o endpoint externo
        String externalUrl = "https://web-copy-production-1dcc.up.railway.app/sentmail"; // Substitua com a URL real
        ResponseEntity<String> externalResponse = restTemplate.postForEntity(externalUrl, externalRequestBody, String.class);

        // Verifique a resposta do endpoint externo
        if (externalResponse.getStatusCode().is2xxSuccessful()) {
            // Lógica para atualizar pontos e salvar alterações
            user.setPoints(user.getPoints() - (productModel.getValue()));
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("Produto " + productId + " resgatado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao contatar o serviço externo.");
        }
    }




}
