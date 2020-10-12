<?php


require_once '../../../../server/os.php';
$os = new os();
if (!$os->session_exists()) {
    die('No existe sesion!');
}


if(isset($_POST['data'])){
    if($_POST['data']!= '0'){
        if(isset($_FILES)){
            $temp_file_name = $_FILES['doc-path']['tmp_name'];

            $original_file_name = $_FILES['doc-path']['name'];
            $uploaddir =   __DIR__  . "";

            $nombreArchivo = $_FILES['doc-path']['name'];

            $vowels = array("[", "]");
            $nombreArchivo = str_replace($vowels, "", $nombreArchivo);

            $uploadfile = $uploaddir . basename($_POST['data']. '-' .$nombreArchivo );


            if (move_uploaded_file($temp_file_name, $uploadfile)) {

                insertDocumentos('documentos/resolucion/' .$_POST['data']. '-' . $_FILES['doc-path']['name'], $_POST['data']);

            }

        }
    }
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



function insertDocumentos($url, $idOper)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT COUNT(*) total FROM amc_libro_diario   WHERE url_documento =  '$url';";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $id = 0;
    if ($row['total'] == 0 ) {

        $vowels = array("[", "]");
        $url = str_replace($vowels, "", $url);

        $sql = "UPDATE amc_libro_diario SET url_documento='$url' where id ='$idOper';";
        //echo $sql;
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();
        $id = $os->db->conn->lastInsertId();
    }

    // genero el nuevo codigo de proceso
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "file" => $_FILES['doc-path']['name'],
        "data" => $id,
        "message" => "error"
    ));
}
