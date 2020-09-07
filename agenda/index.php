<?php include_once 'includes/templates/header.php';
include 'includes/funciones/funciones.php';
?>


<div class="barra">
    <h1>Agenda de Contactos</h1>
</div>

<section class="contenedor">
    <div class="contenedor-form sombra">
        <form action="#" class="contacto" id="contacto">
            <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>
            <?php include_once 'includes/templates/formulario.php'; ?>
        </form>
    </div>
</section>

<section class="contenedor sombra back-table">
    <div class="buscador">
        <h2>Contactos</h2>
        <div class="sombra buscador">
            <input type="text" id="buscador" placeholder="Buscador de contactos">
        </div>
        <div class="total-contactos">
            <p><span class="contador-contactos"></span>contactos</p>
        </div>
        <div class="contenedor-tabla">
            <table class="listado-contacto">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>empresa</th>
                        <th>teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $contactos = obtenerContactos();
                    if ($contactos->num_rows) :

                        foreach ($contactos as $contacto) : ?>
                            <tr>
                                <td>
                                    <?php
                                    echo $contacto['nombre'];
                                    ?>
                                </td>
                                <td>
                                    <?php
                                    echo $contacto['empresa'];
                                    ?>
                                </td>
                                <td>
                                    <?php
                                    echo $contacto['telefono'];
                                    ?>
                                </td>
                                <td>
                                    <a href="editar.php?id=<?php echo $contacto['id'] ?>" class="btn btn-editar">
                                        <i class="fas fa-pen-square"></i>
                                    </a>
                                    <button data-id="<?php echo $contacto['id'] ?>" class="btn btn-borrar">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                    <?php endforeach;
                    endif ?>
                </tbody>
            </table>
        </div>
    </div>
</section>






<?php include_once 'includes/templates/footer.php'; ?>