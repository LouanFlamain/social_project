<?php
namespace App\Service;

use Lcobucci\JWT\Encoding\CannotDecodeContent;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Token\InvalidTokenStructure;
use Lcobucci\JWT\Token\Parser;
use Lcobucci\JWT\Token\UnsupportedHeaderFound;
use Lcobucci\JWT\UnencryptedToken;



class JwtExtractEmail {
    public function extractInformations($jwtString) {
        $jwt_array = explode('.', $jwtString);
        $bearer_separer = explode(' ',$jwt_array[0]);
        $parser = new Parser(new JoseEncoder());
        try {
            $token = $parser->parse(
                $bearer_separer[1] . '.'
                .$jwt_array[1] .'.'
                . $jwt_array[2]
            );
        } catch (CannotDecodeContent | InvalidTokenStructure | UnsupportedHeaderFound $e) {
            echo 'Oh no, an error: ' . $e->getMessage();
        }
        assert($token instanceof UnencryptedToken);
        
        return $token->claims()->get('email'); 

    }
}

