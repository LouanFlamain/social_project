<?php

namespace App\Service;

class CryptMediaService{

    public function encryptFile($file){
        $key = $_ENV['MESSAGE_CRYPT_KEY'];
        $key = base64_decode($key);
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        // Crypter le contenu
        $encryptedContent = openssl_encrypt($file, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    
        // Encapsuler les données cryptées et l'IV dans un objet JSON, puis les encoder en base64
        $encryptedData = [
            'iv' => base64_encode($iv),
            'encrypted' => base64_encode($encryptedContent) // encodez en base64 pour assurer la sécurité du transport
        ];
    
        //return base64_encode(json_encode($encryptedData));
        return json_encode($encryptedData);
    }
    
    public function decryptMedia(){
        
    }
}