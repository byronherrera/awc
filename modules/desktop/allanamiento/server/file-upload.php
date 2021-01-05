<?php


require_once '../../../../server/os.php';
$os = new os();
if (!$os->session_exists()) {
    die('No existe sesiÃ³n!');
}


if(isset($_POST['data'])){
    $data = json_decode($_POST["data"]);
    if(isset($_POST)){
        if(isset($_FILES)){
            $temp_file_name = $_FILES['doc-path']['tmp_name'];

            $original_file_name = $_FILES['doc-path']['name'];
            $uploaddir =   __DIR__  . "/../../../../archivos/allanamiento/";

            $nombreArchivo = $_FILES['doc-path']['name'];

            $vowels = array("[", "]");
            $nombreArchivo = str_replace($vowels, "", $nombreArchivo);

            $uploadfile = $uploaddir . basename($data->id. '-' .$nombreArchivo );

            if (move_uploaded_file($temp_file_name, $uploadfile)) {
                insertDocumentos('https://amcmatis.quito.gob.ec/archivos/allanamiento/' .$data->id. '-' . $_FILES['doc-path']['name']);
            }else {
                echo "error al subir registro...";
            }

        }
    }
}

function insertDocumentos($url)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $usuario = $os->get_member_id();
    $data = json_decode($_POST["data"]);
    $codigoSitra = (isset($data->codigo_sitra)) ? $data->codigo_sitra : '';

    $sql  = " INSERT INTO amc_proc_reconocimiento_responsabilidad_archivos (id_proc_rec_resp, url, id_usuario, fecha)
              VALUES ('$data->id','$url','$usuario', NOW()); ";

    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    $id = $os->db->conn->lastInsertId();

    // genero el nuevo codigo de proceso
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "file" => $_FILES['doc-path']['name'],
        "data" => $id,
        "message" => "error"
    ));
}

function redimensionar_jpeg($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura, $img_nueva_calidad)
{
    // crear una imagen desde el original
    list($ancho, $alto) = getimagesize($img_original);

    $nuevo_alto = $alto / $ancho * $img_nueva_anchura;
    $img_nueva_altura = $nuevo_alto;
    $img = ImageCreateFromJPEG($img_original);
    // crear una imagen nueva
    $thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);
    // redimensiona la imagen original copiandola en la imagen
    ImageCopyResized($thumb,$img,0,0,0,0,$img_nueva_anchura,$img_nueva_altura,ImageSX($img),ImageSY($img));
    // guardar la nueva imagen redimensionada donde indicia $img_nueva
    ImageJPEG($thumb,$img_nueva,$img_nueva_calidad);
    ImageDestroy($img);
}
