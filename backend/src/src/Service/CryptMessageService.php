<?php

namespace App\Service;

class CryptMessageService{
    public function __construct(){

    }
    public function encryptMessage($message){
        $key = $_ENV['MESSAGE_CRYPT_KEY'];
        $key = base64_decode($key);
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        $encryptedMessage = openssl_encrypt($message, 'aes-256-cbc', $key, 0, $iv);
        $messageData = ['iv' => base64_encode($iv), 'encrypted' => $encryptedMessage];
        return base64_encode(json_encode($messageData));
    }
    public function decryptMessage($encryptedMessage){
        $key = $_ENV['MESSAGE_CRYPT_KEY'];
        $key = base64_decode($key);
        try{
            $messageData = json_decode(base64_decode($encryptedMessage), true);
            $iv = base64_decode($messageData['iv']);
            $decryptedMessage = openssl_decrypt($messageData['encrypted'], 'aes-256-cbc', $key, 0, $iv);
            return $decryptedMessage;
        }
        catch(\Exception $e){
            return "";
        }
    }
}