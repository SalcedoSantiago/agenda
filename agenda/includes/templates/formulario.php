
    <div class="campos">
        <div class="campo">
            <label for="nombre">Nombre:</label>
            <input  type="text"
                    id="nombre" 
                    placeholder="Ingrese su nombre"
                    value="<?php echo ($contacto['nombre']) ? $contacto['nombre'] : '' ; ?>"
                    >
        </div>
        <div class="campo">
            <label for="empresa">empresa:</label>
            <input  type="text" 
                    id="empresa" 
                    placeholder="Ingrese su empresa"
                    value="<?php echo ($contacto['empresa'])? $contacto['empresa'] : '' ;?>"
                    >
        </div>
        <div class="campo">
            <label for="telefono">Teléfono:</label>
            <input  type="tel" 
                    id="telefono" 
                    placeholder="Ingrese su telefono"
                    value="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : '' ; ?>">
        </div>
    </div>
    <div class="campo enviar">
        <input type="hidden" id="accion" value="<?php echo ($contacto['nombre']) ? 'editar' : 'crear' ;?>">
        <?php if($contacto['nombre']): ?>
            <input type="hidden" id="id" value="<?php echo $contacto['id'] ?>">
        <?php endif ?>
        <input type="submit">
    </div>

