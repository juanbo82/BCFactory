const TableBuilder = {
    fieldCounter: 1,
    alDataTypes: [
        'Integer', 'BigInteger', 'Decimal', 'Boolean', 'Text[100]', 'Text[250]',
        'Code[10]', 'Code[20]', 'Code[50]', 'Date', 'Time', 'DateTime',
        'Guid', 'Blob', 'Media', 'MediaSet', 'Option', 'Enum',
        'RecordId', 'DateFormula', 'Duration', 'TableFilter'
    ],

    render() {
        const typeOptions = this.alDataTypes.map(t =>
            `<option value="${t}">${t}</option>`
        ).join('');

        return `
            <div class="tool-row">
                <div class="tool-form-group">
                    <label>Object ID</label>
                    <input class="tool-input" type="number" id="tbObjectId" placeholder="50100">
                </div>
                <div class="tool-form-group">
                    <label>Nombre de la Tabla</label>
                    <input class="tool-input" type="text" id="tbTableName" placeholder="My Custom Table">
                </div>
            </div>
            <div class="tool-row">
                <div class="tool-form-group">
                    <label>Tipo</label>
                    <select class="tool-select" id="tbType">
                        <option value="table">Table (nueva)</option>
                        <option value="tableextension">Table Extension</option>
                    </select>
                </div>
                <div class="tool-form-group" id="tbExtendsGroup" style="display:none">
                    <label>Extends Table</label>
                    <input class="tool-input" type="text" id="tbExtendsTable" placeholder="Customer">
                </div>
            </div>

            <div style="margin-top: 20px">
                <label style="display:block;font-size:0.85rem;font-weight:600;color:var(--text-secondary);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">Campos</label>
                <div class="tool-fields-list" id="tbFieldsList">
                    <div class="tool-field-row" style="font-size:0.75rem;color:var(--text-tertiary);font-weight:600;text-transform:uppercase;letter-spacing:0.5px">
                        <span>ID</span><span>Nombre</span><span>Tipo</span><span></span>
                    </div>
                </div>
                <button class="tool-add-btn" onclick="TableBuilder.addField()">+ Añadir Campo</button>
            </div>

            <button class="btn btn-primary" onclick="TableBuilder.generate()" style="margin-top:20px">
                Generar Tabla &rarr;
            </button>
            <div class="tool-output" id="tbOutput" style="display:none">
                <div class="tool-output-header">
                    <span class="tool-output-title" id="tbFileName">Table.al</span>
                    <button class="tool-copy-btn" onclick="TableBuilder.copy()">Copiar</button>
                </div>
                <pre class="tool-output-code" id="tbCode"></pre>
            </div>
        `;
    },

    init() {
        this.fieldCounter = 1;
        document.getElementById('tbType').addEventListener('change', (e) => {
            document.getElementById('tbExtendsGroup').style.display =
                e.target.value === 'tableextension' ? 'block' : 'none';
        });
        this.addField();
        this.addField();
    },

    addField() {
        const list = document.getElementById('tbFieldsList');
        const id = this.fieldCounter++;
        const typeOptions = this.alDataTypes.map(t =>
            `<option value="${t}" ${t === 'Text[100]' ? 'selected' : ''}>${t}</option>`
        ).join('');

        const row = document.createElement('div');
        row.className = 'tool-field-row';
        row.dataset.fieldId = id;
        row.innerHTML = `
            <input class="tool-input" type="number" value="${id}" data-prop="id">
            <input class="tool-input" type="text" placeholder="Field Name" data-prop="name">
            <select class="tool-select" data-prop="type">${typeOptions}</select>
            <button class="tool-remove-btn" onclick="TableBuilder.removeField(this)">&times;</button>
        `;
        list.appendChild(row);
    },

    removeField(btn) {
        btn.closest('.tool-field-row').remove();
    },

    getFields() {
        const rows = document.querySelectorAll('#tbFieldsList .tool-field-row[data-field-id]');
        return Array.from(rows).map(row => ({
            id: row.querySelector('[data-prop="id"]').value,
            name: row.querySelector('[data-prop="name"]').value || 'MyField',
            type: row.querySelector('[data-prop="type"]').value
        }));
    },

    generate() {
        const objectId = document.getElementById('tbObjectId').value || '50100';
        const tableName = document.getElementById('tbTableName').value || 'My Custom Table';
        const type = document.getElementById('tbType').value;
        const extendsTable = document.getElementById('tbExtendsTable').value || 'Customer';
        const fields = this.getFields();

        const fieldStartId = type === 'tableextension' ? 50100 : 1;

        const fieldsCode = fields.map((f, i) => {
            const fid = f.id || (fieldStartId + i);
            return `        field(${fid}; "${f.name}"; ${f.type})
        {
            Caption = '${f.name}';
            DataClassification = CustomerContent;
        }`;
        }).join('\n');

        let code;
        if (type === 'tableextension') {
            code = `tableextension ${objectId} "${tableName}" extends "${extendsTable}"
{
    fields
    {
${fieldsCode}
    }
}`;
        } else {
            const keysCode = fields.length > 0
                ? `        key(PK; "${fields[0].name}")
        {
            Clustered = true;
        }`
                : '';

            code = `table ${objectId} "${tableName}"
{
    Caption = '${tableName}';
    DataClassification = CustomerContent;

    fields
    {
${fieldsCode}
    }

    keys
    {
${keysCode}
    }

    trigger OnInsert()
    begin
    end;

    trigger OnModify()
    begin
    end;

    trigger OnDelete()
    begin
    end;
}`;
        }

        document.getElementById('tbCode').textContent = code;
        document.getElementById('tbOutput').style.display = 'block';
        document.getElementById('tbFileName').textContent = `${tableName}.al`;
    },

    copy() {
        const code = document.getElementById('tbCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.querySelector('#tbOutput .tool-copy-btn');
            btn.textContent = '¡Copiado!';
            setTimeout(() => btn.textContent = 'Copiar', 2000);
        });
    }
};
