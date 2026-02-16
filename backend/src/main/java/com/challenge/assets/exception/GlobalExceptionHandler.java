package com.challenge.assets.exception;

import com.challenge.assets.dto.error.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Global exception handler that returns structured {@link ApiErrorResponse} for all API errors.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AssetNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleAssetNotFound(AssetNotFoundException ex) {
        ErrorCode errorCode = ex.getErrorCodeEnum();
        ApiErrorResponse body = buildResponse(
                errorCode.getHttpStatus().value(),
                errorCode.getCode(),
                ex.getMessage(),
                null
        );
        return ResponseEntity.status(errorCode.getHttpStatus()).body(body);
    }

    @ExceptionHandler(AssetAlreadyExistsException.class)
    public ResponseEntity<ApiErrorResponse> handleAssetAlreadyExists(AssetAlreadyExistsException ex) {
        ErrorCode errorCode = ex.getErrorCodeEnum();
        ApiErrorResponse body = buildResponse(
                errorCode.getHttpStatus().value(),
                errorCode.getCode(),
                ex.getMessage(),
                null
        );
        return ResponseEntity.status(errorCode.getHttpStatus()).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        List<ApiErrorResponse.ValidationError> details = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> new ApiErrorResponse.ValidationError(err.getField(), err.getDefaultMessage()))
                .collect(Collectors.toList());
        ErrorCode errorCode = ErrorCode.VALIDATION_ERROR;
        ApiErrorResponse body = buildResponse(
                errorCode.getHttpStatus().value(),
                errorCode.getCode(),
                errorCode.getMessage(),
                details
        );
        return ResponseEntity.status(errorCode.getHttpStatus()).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneralException(Exception ex) {
        log.error("Erro interno não tratado: ", ex);
        ErrorCode errorCode = ErrorCode.INTERNAL_ERROR;
        ApiErrorResponse body = buildResponse(
                errorCode.getHttpStatus().value(),
                errorCode.getCode(),
                errorCode.getMessage(),
                null
        );
        return ResponseEntity.status(errorCode.getHttpStatus()).body(body);
    }

    private ApiErrorResponse buildResponse(int status, String code, String message, List<ApiErrorResponse.ValidationError> details) {
        return new ApiErrorResponse(
                status,
                code,
                message,
                LocalDateTime.now(),
                details != null ? details : List.of()
        );
    }
}
