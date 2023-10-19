import { MenuItem } from "@mui/material";
import { gridFilteredSortedRowIdsSelector, gridVisibleColumnFieldsSelector, useGridApiContext, GridToolbarExportContainer, GridToolbarContainer } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { AssetConfig } from "./AssetConfig";
import { RequirementConfig } from "./RequirementConfig";
function getExcelData(apiRef: any) {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map((id) => {
        const row = {};
        visibleColumnsField.forEach((field) => {
            // @ts-ignore
            row[field] = apiRef.current.getCellParams(id, field).value;
        });
        return row;
    });

    return data;
}

function handleExportReqs(apiRef: any) {
    const data = getExcelData(apiRef);

    const rows = data.map((row) => {
        const mRow = {};
        // @ts-ignore
        for (const key of RequirementConfig.keys) {
            // @ts-ignore
            mRow[key] = row[key].toString();
        }
        return mRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.sheet_add_aoa(worksheet, [[...RequirementConfig.columnNames]], {
        origin: 'A1',
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, RequirementConfig.sheetName);
    XLSX.writeFile(workbook, RequirementConfig.fileName, { compression: true });
}

function handleExportAssets(apiRef: any) {
    const data = getExcelData(apiRef);

    const rows = data.map((row) => {
        const mRow = {};
        // @ts-ignore
        for (const key of AssetConfig.keys) {
            // @ts-ignore
            mRow[key] = row[key].toString();
        }
        return mRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.sheet_add_aoa(worksheet, [[...AssetConfig.columnNames]], {
        origin: 'A1',
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, AssetConfig.sheetName);
    XLSX.writeFile(workbook, AssetConfig.fileName, { compression: true });
}

export function ExportReqsMenuItem(props: any) {
    const apiRef = useGridApiContext();
    const { hideMenu } = props;

    return (
        <MenuItem
            onClick={() => {
                handleExportReqs(apiRef);
                // Hide the export menu after the export
                hideMenu?.();
            }}
        >
            Download Excel
        </MenuItem>
    );
}

export function ExportAssetsMenuItem(props: any) {
    const apiRef = useGridApiContext();
    const { hideMenu } = props;

    return (
        <MenuItem
            onClick={() => {
                handleExportAssets(apiRef);
                // Hide the export menu after the export
                hideMenu?.();
            }}
        >
            Download Excel
        </MenuItem>
    );
}

export function ExportReqsButton(props: any) {
    return (
        <GridToolbarExportContainer {...props}>
            <ExportReqsMenuItem />
        </GridToolbarExportContainer>
    );
}

export function ExportAssetsButton(props: any) {
    return (
        <GridToolbarExportContainer {...props}>
            <ExportAssetsMenuItem />
        </GridToolbarExportContainer>
    );
}
export function CustomReqsToolbar(props: any) {
    return (
        <GridToolbarContainer {...props}>
            <ExportReqsButton />
        </GridToolbarContainer>
    );
}
export function CustomAssetsToolbar(props: any) {
    return (
        <GridToolbarContainer {...props}>
            <ExportAssetsButton />
        </GridToolbarContainer>
    );
}
