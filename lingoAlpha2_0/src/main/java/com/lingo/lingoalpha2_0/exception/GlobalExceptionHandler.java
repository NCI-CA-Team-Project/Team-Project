package com.lingo.lingoalpha2_0.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream().map(error -> error.getDefaultMessage()).toList();

        APIErrorResponse response = new APIErrorResponse(HttpStatus.BAD_REQUEST.value(), "Validation Error", errors);

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<APIErrorResponse> handleResponseStatusException(ResponseStatusException ex){
        APIErrorResponse response = new APIErrorResponse(ex.getStatusCode().value(), ex.getReason(), List.of());

        return new ResponseEntity<>(response, ex.getStatusCode());
    }
}
