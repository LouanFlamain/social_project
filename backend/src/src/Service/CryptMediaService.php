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
    
    public function decryptMedia($encryptedData)
    {
        $key = $_ENV['MESSAGE_CRYPT_KEY'];
        $key = base64_decode($key);
        try {
            $mediaData = json_decode($encryptedData, true);
            $iv = base64_decode($mediaData['iv']);
            
            // Assurez-vous que le contenu crypté est également décodé en base64
            $encryptedData = base64_decode($mediaData['encrypted']);
    
            // Décrypter en utilisant les données binaires
            $decryptedMedia = openssl_decrypt($encryptedData, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
            return $decryptedMedia;
        } catch (\Exception $e) {
            // Log de l'erreur pour le débogage
            // error_log($e->getMessage());
            return "";
        }
    }
    
}