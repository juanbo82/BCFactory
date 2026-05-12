const SnippetGenerator = {
    templates: {
        table: {
            name: 'Table',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre del Objeto', type: 'text', placeholder: 'My Custom Table' },
            ],
            generate(data) {
                return `table ${data.objectId} "${data.objectName}"
{
    Caption = '${data.objectName}';
    DataClassification = CustomerContent;

    fields
    {
        field(1; "Entry No."; Integer)
        {
            Caption = 'Entry No.';
            AutoIncrement = true;
        }
        field(2; "Code"; Code[20])
        {
            Caption = 'Code';
        }
        field(3; "Description"; Text[100])
        {
            Caption = 'Description';
        }
    }

    keys
    {
        key(PK; "Entry No.")
        {
            Clustered = true;
        }
        key(SK1; "Code")
        {
        }
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
        },
        tableExtension: {
            name: 'Table Extension',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre de la Extensión', type: 'text', placeholder: 'Customer Table Ext' },
                { id: 'extendsTable', label: 'Tabla Base', type: 'text', placeholder: 'Customer' },
            ],
            generate(data) {
                return `tableextension ${data.objectId} "${data.objectName}" extends "${data.extendsTable}"
{
    fields
    {
        field(50100; "Custom Field"; Text[100])
        {
            Caption = 'Custom Field';
            DataClassification = CustomerContent;
        }
    }
}`;
            }
        },
        page: {
            name: 'Page (List)',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre de la Página', type: 'text', placeholder: 'My Custom List' },
                { id: 'sourceTable', label: 'Source Table', type: 'text', placeholder: 'My Custom Table' },
            ],
            generate(data) {
                return `page ${data.objectId} "${data.objectName}"
{
    ApplicationArea = All;
    Caption = '${data.objectName}';
    PageType = List;
    SourceTable = "${data.sourceTable}";
    UsageCategory = Lists;
    Editable = false;

    layout
    {
        area(Content)
        {
            repeater(General)
            {
                field("Code"; Rec."Code")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the code.';
                }
                field("Description"; Rec."Description")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the description.';
                }
            }
        }
    }

    actions
    {
        area(Processing)
        {
            action(DoSomething)
            {
                ApplicationArea = All;
                Caption = 'Do Something';
                Image = Process;
                ToolTip = 'Executes the action.';

                trigger OnAction()
                begin
                end;
            }
        }
        area(Promoted)
        {
            group(Category_Process)
            {
                actionref(DoSomething_Promoted; DoSomething) { }
            }
        }
    }
}`;
            }
        },
        pageCard: {
            name: 'Page (Card)',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50101' },
                { id: 'objectName', label: 'Nombre de la Página', type: 'text', placeholder: 'My Custom Card' },
                { id: 'sourceTable', label: 'Source Table', type: 'text', placeholder: 'My Custom Table' },
            ],
            generate(data) {
                return `page ${data.objectId} "${data.objectName}"
{
    ApplicationArea = All;
    Caption = '${data.objectName}';
    PageType = Card;
    SourceTable = "${data.sourceTable}";

    layout
    {
        area(Content)
        {
            group(General)
            {
                Caption = 'General';

                field("Code"; Rec."Code")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the code.';
                }
                field("Description"; Rec."Description")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the description.';
                }
            }
        }
    }

    actions
    {
        area(Processing)
        {
        }
    }
}`;
            }
        },
        pageExtension: {
            name: 'Page Extension',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre de la Extensión', type: 'text', placeholder: 'Customer Card Ext' },
                { id: 'extendsPage', label: 'Página Base', type: 'text', placeholder: 'Customer Card' },
                { id: 'addAfterField', label: 'Añadir después de', type: 'text', placeholder: 'Name' },
            ],
            generate(data) {
                return `pageextension ${data.objectId} "${data.objectName}" extends "${data.extendsPage}"
{
    layout
    {
        addafter(${data.addAfterField})
        {
            field("Custom Field"; Rec."Custom Field")
            {
                ApplicationArea = All;
                Caption = 'Custom Field';
                ToolTip = 'Specifies the custom field.';
            }
        }
    }

    actions
    {
        addlast(Processing)
        {
            action(MyAction)
            {
                ApplicationArea = All;
                Caption = 'My Action';
                Image = Process;
                ToolTip = 'Executes my action.';

                trigger OnAction()
                begin
                end;
            }
        }
    }
}`;
            }
        },
        codeunit: {
            name: 'Codeunit',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre del Codeunit', type: 'text', placeholder: 'My Custom Logic' },
            ],
            generate(data) {
                return `codeunit ${data.objectId} "${data.objectName}"
{
    Description = '${data.objectName}';

    procedure MyProcedure(InputParam: Text): Boolean
    var
        IsHandled: Boolean;
    begin
        OnBeforeMyProcedure(InputParam, IsHandled);
        if IsHandled then
            exit(true);

        // Your logic here

        OnAfterMyProcedure(InputParam);
        exit(true);
    end;

    [IntegrationEvent(false, false)]
    local procedure OnBeforeMyProcedure(InputParam: Text; var IsHandled: Boolean)
    begin
    end;

    [IntegrationEvent(false, false)]
    local procedure OnAfterMyProcedure(InputParam: Text)
    begin
    end;
}`;
            }
        },
        report: {
            name: 'Report',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre del Report', type: 'text', placeholder: 'My Custom Report' },
                { id: 'sourceTable', label: 'Source Table', type: 'text', placeholder: 'Customer' },
            ],
            generate(data) {
                return `report ${data.objectId} "${data.objectName}"
{
    ApplicationArea = All;
    Caption = '${data.objectName}';
    UsageCategory = ReportsAndAnalysis;
    DefaultRenderingLayout = ExcelLayout;

    dataset
    {
        dataitem(DataItemName; "${data.sourceTable}")
        {
            RequestFilterFields = "No.";

            column(No; "No.") { }
            column(Name; Name) { }
        }
    }

    requestpage
    {
        layout
        {
            area(Content)
            {
                group(Options)
                {
                }
            }
        }
    }

    rendering
    {
        layout(ExcelLayout)
        {
            Type = Excel;
            LayoutFile = 'src/layout/${data.objectName}.xlsx';
            Caption = '${data.objectName} (Excel)';
            Summary = 'Excel layout for ${data.objectName}';
        }
    }
}`;
            }
        },
        enum: {
            name: 'Enum',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre del Enum', type: 'text', placeholder: 'My Status' },
            ],
            generate(data) {
                return `enum ${data.objectId} "${data.objectName}"
{
    Extensible = true;
    Caption = '${data.objectName}';

    value(0; " ")
    {
        Caption = ' ';
    }
    value(1; "Open")
    {
        Caption = 'Open';
    }
    value(2; "Released")
    {
        Caption = 'Released';
    }
    value(3; "Closed")
    {
        Caption = 'Closed';
    }
}`;
            }
        },
        xmlport: {
            name: 'XMLport',
            fields: [
                { id: 'objectId', label: 'Object ID', type: 'number', placeholder: '50100' },
                { id: 'objectName', label: 'Nombre del XMLport', type: 'text', placeholder: 'Import Data' },
                { id: 'sourceTable', label: 'Source Table', type: 'text', placeholder: 'My Custom Table' },
            ],
            generate(data) {
                return `xmlport ${data.objectId} "${data.objectName}"
{
    Caption = '${data.objectName}';
    Direction = Import;
    Format = VariableText;
    FieldSeparator = ';';
    TextEncoding = UTF8;

    schema
    {
        textelement(Root)
        {
            tableelement(DataLine; "${data.sourceTable}")
            {
                fieldelement(Code; DataLine."Code") { }
                fieldelement(Description; DataLine."Description") { }
            }
        }
    }

    requestpage
    {
        layout
        {
            area(Content)
            {
                group(Options)
                {
                }
            }
        }
    }
}`;
            }
        }
    },

    render() {
        const templateKeys = Object.keys(this.templates);
        const options = templateKeys.map(k =>
            `<option value="${k}">${this.templates[k].name}</option>`
        ).join('');

        return `
            <div class="tool-form-group">
                <label>Tipo de Objeto</label>
                <select class="tool-select" id="snippetType" onchange="SnippetGenerator.updateForm()">
                    ${options}
                </select>
            </div>
            <div id="snippetFields"></div>
            <button class="btn btn-primary" onclick="SnippetGenerator.generate()" style="margin-top:8px">
                Generar Código &rarr;
            </button>
            <div class="tool-output" id="snippetOutput" style="display:none">
                <div class="tool-output-header">
                    <span class="tool-output-title" id="snippetFileName">output.al</span>
                    <button class="tool-copy-btn" onclick="SnippetGenerator.copy()">Copiar</button>
                </div>
                <pre class="tool-output-code" id="snippetCode"></pre>
            </div>
        `;
    },

    updateForm() {
        const type = document.getElementById('snippetType').value;
        const template = this.templates[type];
        const container = document.getElementById('snippetFields');

        container.innerHTML = template.fields.map(f => `
            <div class="tool-form-group">
                <label>${f.label}</label>
                <input class="tool-input" type="${f.type}" id="snippet_${f.id}" placeholder="${f.placeholder}">
            </div>
        `).join('');
    },

    generate() {
        const type = document.getElementById('snippetType').value;
        const template = this.templates[type];
        const data = {};
        template.fields.forEach(f => {
            const el = document.getElementById(`snippet_${f.id}`);
            data[f.id] = el.value || el.placeholder;
        });

        const code = template.generate(data);
        document.getElementById('snippetCode').textContent = code;
        document.getElementById('snippetOutput').style.display = 'block';
        document.getElementById('snippetFileName').textContent =
            `${data.objectName || 'Object'}.al`;
    },

    copy() {
        const code = document.getElementById('snippetCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.querySelector('#snippetOutput .tool-copy-btn');
            btn.textContent = '¡Copiado!';
            setTimeout(() => btn.textContent = 'Copiar', 2000);
        });
    }
};
