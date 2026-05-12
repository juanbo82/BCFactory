const ObjectReference = {
    render() {
        return `
            <div class="tool-tabs" id="refTabs">
                <button class="tool-tab active" data-tab="ranges" onclick="ObjectReference.switchTab('ranges')">Rangos de Objetos</button>
                <button class="tool-tab" data-tab="datatypes" onclick="ObjectReference.switchTab('datatypes')">Tipos de Datos</button>
                <button class="tool-tab" data-tab="triggers" onclick="ObjectReference.switchTab('triggers')">Triggers</button>
                <button class="tool-tab" data-tab="properties" onclick="ObjectReference.switchTab('properties')">Propiedades</button>
                <button class="tool-tab" data-tab="tips" onclick="ObjectReference.switchTab('tips')">Tips & Tricks</button>
            </div>

            <div class="tool-tab-content active" id="tab-ranges">
                <div class="ref-grid">
                    <div class="ref-card">
                        <h4>Rangos de Objetos Microsoft</h4>
                        <table>
                            <tr><th>Rango</th><th>Uso</th></tr>
                            <tr><td>1 - 49,999</td><td>Objetos base de Microsoft</td></tr>
                            <tr><td>50,000 - 99,999</td><td>Personalización por cliente</td></tr>
                            <tr><td>100,000 - 999,999</td><td>Reservado para add-ons</td></tr>
                            <tr><td>1,000,000 - 69,999,999</td><td>AppSource (asignado por MS)</td></tr>
                            <tr><td>70,000,000 - 74,999,999</td><td>Partner (asignado por MS)</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Tipos de Objetos</h4>
                        <table>
                            <tr><th>Tipo</th><th>Extensión</th></tr>
                            <tr><td>Table</td><td>TableExtension</td></tr>
                            <tr><td>Page</td><td>PageExtension</td></tr>
                            <tr><td>Report</td><td>ReportExtension</td></tr>
                            <tr><td>Codeunit</td><td>—</td></tr>
                            <tr><td>Enum</td><td>EnumExtension</td></tr>
                            <tr><td>Query</td><td>—</td></tr>
                            <tr><td>XMLport</td><td>—</td></tr>
                            <tr><td>Profile</td><td>ProfileExtension</td></tr>
                            <tr><td>PermissionSet</td><td>PermSetExtension</td></tr>
                            <tr><td>Interface</td><td>—</td></tr>
                            <tr><td>ControlAddIn</td><td>—</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Rangos Recomendados</h4>
                        <table>
                            <tr><th>Tipo</th><th>Rango Sugerido</th></tr>
                            <tr><td>Tables</td><td>50100 - 50199</td></tr>
                            <tr><td>Table Ext.</td><td>50100 - 50199</td></tr>
                            <tr><td>Pages</td><td>50100 - 50199</td></tr>
                            <tr><td>Page Ext.</td><td>50100 - 50199</td></tr>
                            <tr><td>Codeunits</td><td>50100 - 50199</td></tr>
                            <tr><td>Reports</td><td>50100 - 50199</td></tr>
                            <tr><td>Enums</td><td>50100 - 50199</td></tr>
                            <tr><td>XMLports</td><td>50100 - 50199</td></tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tool-tab-content" id="tab-datatypes">
                <div class="ref-grid">
                    <div class="ref-card">
                        <h4>Tipos Numéricos</h4>
                        <table>
                            <tr><th>Tipo</th><th>Descripción</th></tr>
                            <tr><td>Integer</td><td>-2,147,483,647 a 2,147,483,647</td></tr>
                            <tr><td>BigInteger</td><td>64-bit integer</td></tr>
                            <tr><td>Decimal</td><td>Hasta 18 dígitos significativos</td></tr>
                            <tr><td>Byte</td><td>0 a 255</td></tr>
                            <tr><td>Char</td><td>Carácter individual (0-65535)</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Tipos de Texto</h4>
                        <table>
                            <tr><th>Tipo</th><th>Descripción</th></tr>
                            <tr><td>Text[n]</td><td>Cadena variable (max 2048)</td></tr>
                            <tr><td>Code[n]</td><td>Texto sin espacios al inicio/fin</td></tr>
                            <tr><td>Label</td><td>Texto traducible (constante)</td></tr>
                            <tr><td>TextConst</td><td>Texto multilenguaje (legacy)</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Fecha y Hora</h4>
                        <table>
                            <tr><th>Tipo</th><th>Descripción</th></tr>
                            <tr><td>Date</td><td>Fecha (01/01/0001 a 12/31/9999)</td></tr>
                            <tr><td>Time</td><td>Hora del día</td></tr>
                            <tr><td>DateTime</td><td>Fecha y hora combinados</td></tr>
                            <tr><td>Duration</td><td>Duración en milisegundos</td></tr>
                            <tr><td>DateFormula</td><td>Fórmula de fecha relativa</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Tipos Complejos</h4>
                        <table>
                            <tr><th>Tipo</th><th>Descripción</th></tr>
                            <tr><td>Boolean</td><td>true / false</td></tr>
                            <tr><td>Option</td><td>Enum implícito (legacy)</td></tr>
                            <tr><td>Enum</td><td>Enumeración tipada</td></tr>
                            <tr><td>Guid</td><td>Identificador único global</td></tr>
                            <tr><td>Blob</td><td>Binary Large Object</td></tr>
                            <tr><td>Media</td><td>Archivo multimedia único</td></tr>
                            <tr><td>MediaSet</td><td>Colección de multimedia</td></tr>
                            <tr><td>RecordId</td><td>Referencia a registro</td></tr>
                            <tr><td>TableFilter</td><td>Filtro de tabla</td></tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tool-tab-content" id="tab-triggers">
                <div class="ref-grid">
                    <div class="ref-card">
                        <h4>Triggers de Tabla</h4>
                        <table>
                            <tr><th>Trigger</th><th>Cuándo se ejecuta</th></tr>
                            <tr><td>OnInsert</td><td>Al insertar registro</td></tr>
                            <tr><td>OnModify</td><td>Al modificar registro</td></tr>
                            <tr><td>OnDelete</td><td>Al eliminar registro</td></tr>
                            <tr><td>OnRename</td><td>Al renombrar PK</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Triggers de Campo</h4>
                        <table>
                            <tr><th>Trigger</th><th>Cuándo se ejecuta</th></tr>
                            <tr><td>OnValidate</td><td>Al validar el campo</td></tr>
                            <tr><td>OnLookup</td><td>Al hacer lookup</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Triggers de Página</h4>
                        <table>
                            <tr><th>Trigger</th><th>Cuándo se ejecuta</th></tr>
                            <tr><td>OnInit</td><td>Al inicializar página</td></tr>
                            <tr><td>OnOpenPage</td><td>Al abrir página</td></tr>
                            <tr><td>OnClosePage</td><td>Al cerrar página</td></tr>
                            <tr><td>OnAfterGetRecord</td><td>Tras obtener registro</td></tr>
                            <tr><td>OnAfterGetCurrRecord</td><td>Tras obtener reg. actual</td></tr>
                            <tr><td>OnNewRecord</td><td>Al crear nuevo registro</td></tr>
                            <tr><td>OnInsertRecord</td><td>Al insertar registro</td></tr>
                            <tr><td>OnModifyRecord</td><td>Al modificar registro</td></tr>
                            <tr><td>OnDeleteRecord</td><td>Al eliminar registro</td></tr>
                            <tr><td>OnQueryClosePage</td><td>Al intentar cerrar</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Triggers de Report</h4>
                        <table>
                            <tr><th>Trigger</th><th>Cuándo se ejecuta</th></tr>
                            <tr><td>OnInitReport</td><td>Al inicializar</td></tr>
                            <tr><td>OnPreReport</td><td>Antes de ejecutar</td></tr>
                            <tr><td>OnPostReport</td><td>Después de ejecutar</td></tr>
                            <tr><td>OnPreDataItem</td><td>Antes del DataItem</td></tr>
                            <tr><td>OnAfterGetRecord</td><td>Tras obtener registro</td></tr>
                            <tr><td>OnPostDataItem</td><td>Después del DataItem</td></tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tool-tab-content" id="tab-properties">
                <div class="ref-grid">
                    <div class="ref-card">
                        <h4>Propiedades de Campo</h4>
                        <table>
                            <tr><th>Propiedad</th><th>Descripción</th></tr>
                            <tr><td>Caption</td><td>Etiqueta visible del campo</td></tr>
                            <tr><td>DataClassification</td><td>Clasificación GDPR</td></tr>
                            <tr><td>TableRelation</td><td>FK a otra tabla</td></tr>
                            <tr><td>CalcFormula</td><td>Campo calculado (FlowField)</td></tr>
                            <tr><td>FieldClass</td><td>Normal / FlowField / FlowFilter</td></tr>
                            <tr><td>InitValue</td><td>Valor inicial</td></tr>
                            <tr><td>NotBlank</td><td>No permitir vacío</td></tr>
                            <tr><td>Editable</td><td>Si es editable</td></tr>
                            <tr><td>AutoIncrement</td><td>Auto incremento</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Propiedades de Página</h4>
                        <table>
                            <tr><th>Propiedad</th><th>Descripción</th></tr>
                            <tr><td>PageType</td><td>Card, List, Document, etc.</td></tr>
                            <tr><td>SourceTable</td><td>Tabla fuente</td></tr>
                            <tr><td>ApplicationArea</td><td>Área de aplicación</td></tr>
                            <tr><td>UsageCategory</td><td>Categoría de búsqueda</td></tr>
                            <tr><td>Editable</td><td>Si la página es editable</td></tr>
                            <tr><td>InsertAllowed</td><td>Si permite insertar</td></tr>
                            <tr><td>DeleteAllowed</td><td>Si permite eliminar</td></tr>
                            <tr><td>CardPageId</td><td>Página card asociada</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>DataClassification</h4>
                        <table>
                            <tr><th>Valor</th><th>Uso</th></tr>
                            <tr><td>CustomerContent</td><td>Datos de negocio del cliente</td></tr>
                            <tr><td>ToBeClassified</td><td>Pendiente de clasificar</td></tr>
                            <tr><td>SystemMetadata</td><td>Metadatos del sistema</td></tr>
                            <tr><td>AccountData</td><td>Datos de la cuenta</td></tr>
                            <tr><td>EndUserIdentifiable</td><td>Datos personales</td></tr>
                            <tr><td>EndUserPseudonymous</td><td>Datos pseudonimizados</td></tr>
                            <tr><td>OrganizationIdentifiable</td><td>Datos de organización</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>PageType</h4>
                        <table>
                            <tr><th>Tipo</th><th>Uso</th></tr>
                            <tr><td>Card</td><td>Ficha de registro individual</td></tr>
                            <tr><td>List</td><td>Lista de registros</td></tr>
                            <tr><td>Document</td><td>Cabecera + líneas</td></tr>
                            <tr><td>Worksheet</td><td>Hoja de trabajo editable</td></tr>
                            <tr><td>ListPart</td><td>Subpágina tipo lista</td></tr>
                            <tr><td>CardPart</td><td>Subpágina tipo card</td></tr>
                            <tr><td>RoleCenter</td><td>Página principal de rol</td></tr>
                            <tr><td>API</td><td>Página para APIs web</td></tr>
                            <tr><td>ConfirmationDialog</td><td>Diálogo de confirmación</td></tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tool-tab-content" id="tab-tips">
                <div class="ref-grid">
                    <div class="ref-card">
                        <h4>Patrón IsHandled</h4>
                        <table>
                            <tr><td colspan="2" style="color:var(--text-secondary);font-family:var(--font-mono);font-size:0.8rem;white-space:pre;padding:12px 8px">procedure DoSomething()
var
    IsHandled: Boolean;
begin
    IsHandled := false;
    OnBeforeDoSomething(IsHandled);
    if IsHandled then
        exit;

    // Logic here

    OnAfterDoSomething();
end;</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Buenas Prácticas</h4>
                        <table>
                            <tr><th style="width:30%">Regla</th><th>Detalle</th></tr>
                            <tr><td>Prefijos</td><td>Usar prefijo de app en todos los objetos</td></tr>
                            <tr><td>ToolTip</td><td>Obligatorio en todos los campos de página</td></tr>
                            <tr><td>Caption</td><td>Siempre definir Caption traducible</td></tr>
                            <tr><td>DataClassification</td><td>Requerido en cada campo de tabla</td></tr>
                            <tr><td>ApplicationArea</td><td>Definir en todos los controles de página</td></tr>
                            <tr><td>Eventos</td><td>Usar patrón IsHandled para extensibilidad</td></tr>
                            <tr><td>Temporary</td><td>Usar registros temporales cuando sea posible</td></tr>
                            <tr><td>Commit</td><td>Evitar COMMIT explícito</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Métodos de Record</h4>
                        <table>
                            <tr><th>Método</th><th>Descripción</th></tr>
                            <tr><td>Get()</td><td>Obtener por PK</td></tr>
                            <tr><td>Find('-')</td><td>Buscar primer registro</td></tr>
                            <tr><td>FindSet()</td><td>Buscar set de registros</td></tr>
                            <tr><td>FindFirst()</td><td>Buscar primer registro</td></tr>
                            <tr><td>FindLast()</td><td>Buscar último registro</td></tr>
                            <tr><td>Next()</td><td>Siguiente registro</td></tr>
                            <tr><td>Insert(true)</td><td>Insertar con triggers</td></tr>
                            <tr><td>Modify(true)</td><td>Modificar con triggers</td></tr>
                            <tr><td>Delete(true)</td><td>Eliminar con triggers</td></tr>
                            <tr><td>SetRange()</td><td>Filtrar por rango</td></tr>
                            <tr><td>SetFilter()</td><td>Filtrar con formato</td></tr>
                            <tr><td>CalcFields()</td><td>Calcular FlowFields</td></tr>
                            <tr><td>CalcSums()</td><td>Calcular sumas</td></tr>
                            <tr><td>IsEmpty()</td><td>Verificar si vacío</td></tr>
                            <tr><td>Count()</td><td>Contar registros</td></tr>
                        </table>
                    </div>
                    <div class="ref-card">
                        <h4>Atajos VS Code + AL</h4>
                        <table>
                            <tr><th>Atajo</th><th>Acción</th></tr>
                            <tr><td>Ctrl+Shift+P</td><td>Command Palette</td></tr>
                            <tr><td>F5</td><td>Publicar y depurar</td></tr>
                            <tr><td>Ctrl+F5</td><td>Publicar sin depurar</td></tr>
                            <tr><td>Ctrl+Shift+B</td><td>Build (compilar)</td></tr>
                            <tr><td>F12</td><td>Ir a definición</td></tr>
                            <tr><td>Alt+F12</td><td>Peek definición</td></tr>
                            <tr><td>Shift+F12</td><td>Ver referencias</td></tr>
                            <tr><td>tpage</td><td>Snippet: Page</td></tr>
                            <tr><td>ttable</td><td>Snippet: Table</td></tr>
                            <tr><td>tcodeunit</td><td>Snippet: Codeunit</td></tr>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    init() {},

    switchTab(tabId) {
        document.querySelectorAll('#refTabs .tool-tab').forEach(t =>
            t.classList.toggle('active', t.dataset.tab === tabId));
        document.querySelectorAll('.tool-tab-content').forEach(c =>
            c.classList.toggle('active', c.id === `tab-${tabId}`));
    }
};
