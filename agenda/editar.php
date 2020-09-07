<?php include_once 'includes/templates/header.php'; 



    if($_GET['id']){
    include 'includes/funciones/funciones.php';
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
    $respuesta = obtenerContactoConId($id);
    $contacto = $respuesta->fetch_assoc();  }  ?>

<div class="barra ">
    <div class="contenedor contenedor-barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>

<section class="contenedor">
    <div class="contenedor-form sombra">
        <form action="#" class="contacto" id="contacto">
            <legend>Editar contacto</legend>
            <?php include_once 'includes/templates/formulario.php'; ?>
        </form>
    </div>
</section>

<?php include_once 'includes/templates/footer.php';
