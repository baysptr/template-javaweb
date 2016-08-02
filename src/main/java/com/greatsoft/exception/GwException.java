package com.greatsoft.exception;
public class GwException extends RuntimeException {

    public GwException() {
    }

    public GwException(String message) {
        super(message);
    }

    public GwException(String message, Throwable cause) {
        super(message, cause);
    }

    public GwException(Throwable cause) {
        super(cause);
    }

    public GwException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
    
}
