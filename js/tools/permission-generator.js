const PermissionGenerator = {
    render() {
        return `
            <div class="tool-row">
                <div class="tool-form-group">
                    <label>Object ID</label>
                    <input class="tool-input" type="number" id="permObjectId" placeholder="50100">
                </div>
                <div class="tool-form-group">
                    <label>Nombre del Permission Set</label>
                    <input class="tool-input" type="text" id="permName" placeholder="MY EXT">
                </div>
            </div>
            <div class="tool-row">
                <div class="tool-form-group">
                    <label>Caption</label>
                    <input class="tool-input" type="text" id="permCaption" placeholder="My Extension Permissions">
                </div>
                <div class="tool-form-group">
                    <label>Formato</label>
                    <select class="tool-select" id="permFormat">
                        <option value="al">AL (permissionset)</option>
                        <option value="alext">AL (permissionsetextension)</option>
                    </select>
                </div>
            </div>

            <div style="margin-top: 20px">
                <label style="display:block;font-size:0.85rem;font-weight:600;color:var(--text-secondary);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">Objetos a Incluir</label>
                <div class="tool-fields-list" id="permFieldsList">
                    <div class="tool-field-row" style="font-size:0.75rem;color:var(--text-tertiary);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;grid-template-columns:1fr 1fr 1fr 40px">
                        <span>Tipo</span><span>Nombre</span><span>Permisos</span><span></span>
                    </div>
                </div>
                <button class="tool-add-btn" onclick="PermissionGenerator.addObject()">+ Añadir Objeto</button>
            </div>

            <button class="btn btn-primary" onclick="PermissionGenerator.generate()" style="margin-top:20px">
                Generar Permission Set &rarr;
            </button>
            <div class="tool-output" id="permOutput" style="display:none">
                <div class="tool-output-header">
                    <span class="tool-output-title" id="permFileName">PermissionSet.al</span>
                    <button class="tool-copy-btn" onclick="PermissionGenerator.copy()">Copiar</button>
                </div>
                <pre class="tool-output-code" id="permCode"></pre>
            </div>
        `;
    },

    init() {
        this.addObject('tabledata', 'My Custom Table', 'RIMD');
        this.addObject('table', 'My Custom Table', 'X');
        this.addObject('page', 'My Custom List', 'X');
        this.addObject('codeunit', 'My Custom Logic', 'X');
    },

    addObject(type, name, perms) {
        const list = document.getElementById('permFieldsList');
        const row = document.createElement('div');
        row.className = 'tool-field-row';
        row.style.gridTemplateColumns = '1fr 1fr 1fr 40px';
        row.innerHTML = `
            <select class="tool-select" data-prop="objType">
                <option value="tabledata" ${type === 'tabledata' ? 'selected' : ''}>Table Data</option>
                <option value="table" ${type === 'table' ? 'selected' : ''}>Table</option>
                <option value="page" ${type === 'page' ? 'selected' : ''}>Page</option>
                <option value="report" ${type === 'report' ? 'selected' : ''}>Report</option>
                <option value="codeunit" ${type === 'codeunit' ? 'selected' : ''}>Codeunit</option>
                <option value="xmlport" ${type === 'xmlport' ? 'selected' : ''}>XMLport</option>
                <option value="query" ${type === 'query' ? 'selected' : ''}>Query</option>
            </select>
            <input class="tool-input" type="text" placeholder="Object Name" data-prop="objName" value="${name || ''}">
            <select class="tool-select" data-prop="permissions">
                <option value="RIMD" ${perms === 'RIMD' ? 'selected' : ''}>RIMD (Full)</option>
                <option value="RIM" ${perms === 'RIM' ? 'selected' : ''}>RIM (No Delete)</option>
                <option value="RI" ${perms === 'RI' ? 'selected' : ''}>RI (Read/Insert)</option>
                <option value="R" ${perms === 'R' ? 'selected' : ''}>R (Read Only)</option>
                <option value="X" ${perms === 'X' ? 'selected' : ''}>X (Execute)</option>
            </select>
            <button class="tool-remove-btn" onclick="this.closest('.tool-field-row').remove()">&times;</button>
        `;
        list.appendChild(row);
    },

    getObjects() {
        const rows = document.querySelectorAll('#permFieldsList .tool-field-row:not(:first-child)');
        return Array.from(rows).map(row => ({
            type: row.querySelector('[data-prop="objType"]').value,
            name: row.querySelector('[data-prop="objName"]').value || 'MyObject',
            permissions: row.querySelector('[data-prop="permissions"]').value
        }));
    },

    generate() {
        const objectId = document.getElementById('permObjectId').value || '50100';
        const name = document.getElementById('permName').value || 'MY EXT';
        const caption = document.getElementById('permCaption').value || 'My Extension Permissions';
        const format = document.getElementById('permFormat').value;
        const objects = this.getObjects();

        const permMap = {
            'RIMD': 'R, I, M, D',
            'RIM': 'R, I, M',
            'RI': 'R, I',
            'R': 'R',
            'X': 'X'
        };

        const permLines = objects.map(obj =>
            `        ${obj.type} "${obj.name}" = ${permMap[obj.permissions]};`
        ).join('\n');

        let code;
        if (format === 'al') {
            code = `permissionset ${objectId} "${name}"
{
    Caption = '${caption}';
    Assignable = true;

    Permissions =
${permLines}
}`;
        } else {
            code = `permissionsetextension ${objectId} "${name}" extends "D365 BASIC"
{
    Permissions =
${permLines}
}`;
        }

        document.getElementById('permCode').textContent = code;
        document.getElementById('permOutput').style.display = 'block';
        document.getElementById('permFileName').textContent = `${name}.PermissionSet.al`;
    },

    copy() {
        const code = document.getElementById('permCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.querySelector('#permOutput .tool-copy-btn');
            btn.textContent = '¡Copiado!';
            setTimeout(() => btn.textContent = 'Copiar', 2000);
        });
    }
};
