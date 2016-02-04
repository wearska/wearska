<?php
if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $tempPath = preg_replace('/\s+/', '_', $tempPath);
    $filename = $_FILES[ 'file' ][ 'name' ];
    $filename = preg_replace('/\s+/', '_', $filename);
    $email = $_POST['email'];
    $root = $_SERVER['DOCUMENT_ROOT'];  
    $baseDir = $root . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'user_photos';
    if (!file_exists($baseDir . DIRECTORY_SEPARATOR . $email)) {
        mkdir($baseDir . DIRECTORY_SEPARATOR . $email, 0777, true);
    }
    $uploadPath = $root . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'user_photos' . DIRECTORY_SEPARATOR .  $email . DIRECTORY_SEPARATOR . $filename;
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( $uploadPath );
    $json = json_encode( $answer );
    echo $json;
} else {
    echo 'No files';
}
?>