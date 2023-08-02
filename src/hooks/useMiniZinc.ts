import { Plan, Requirement } from "./usePlan"

export const useMiniZinc = () => {

    const prepareAllocation = async (plan: Plan) => {
        const assetList = plan.assets
        const crs = plan.requirements.map((entry: Requirement) => {
            return {
                ID: entry.ID,
                Sensor: entry.Intel_Discipline,
                Location: entry.Coordinates,
                Coll_Start_Date: entry.Coll_Start_Date,
                Coll_End_Date: entry.Coll_End_Date,
                Coll_Start_Time: entry.Coll_Start_Time,
                Coll_End_Time: entry.Coll_End_Time,
            }
        })

        const crlen = crs.length;
        const assetlen = assetList.length;
        var crlocations = [];
        var assetlocations = [];
        for (var i = 0; i < crlen; i++)
            crlocations.push(crs[i].Location.split(";")[0].replace(/ |,/, ""));
        for (var i = 0; i < assetlen; i++)
            assetlocations.push(assetList[i].Location.split(";")[0].replace(/ |,/, ""));
        //

        var mzndata = 'CR = {';
        for (var i = 0; i < crlen - 1; i++)
            mzndata += ('CR' + crs[i].ID.toString() + ', ');
        mzndata += ('CR' + crs[crlen - 1].ID.toString() + '};\n\n');
        //
        mzndata += 'ASSET = {';
        for (var i = 0; i < assetlen - 1; i++) {
            console.log(assetList[i].UniquePlatformID)
            console.log(assetList[i].UniquePlatformID.replace(/ /g, "_"))
            mzndata += (assetList[i].UniquePlatformID.replace(/ /g, "_") + ', ');
        }
        mzndata += (assetList[assetlen - 1].UniquePlatformID.replace(/ /g, "_") + '};\n\n');
        //
        mzndata += 'INTELL = {HUMINT, IMINT, MASINT, ACINT, OSINT, SIGINT, EW};\n\n';
        //
        mzndata += "NAI = {'" + [...new Set(crlocations)].toString().replaceAll(",","', '") + "'};\n\n";
        // for (var i = 0; i < crlen-1; i++)
        //   mzndata += (crs[i].Location.split(";")[0].replace(/ |,/,"") + ', ');
        // mzndata += (crs[crlen-1].Location.split(";")[0].replace(/ |,/,"") + '};\n\n');
        //
        mzndata += "BASE = {'" + [...new Set(assetlocations)].toString().replaceAll(",","', '") + "'};\n\n";
        // for (var i = 0; i < assetlen-1; i++)
        //   mzndata += (assetList[i].Location.split(";")[0].replace(/ |,/,"") + ', ');
        // mzndata += (assetList[assetlen-1].Location.split(";")[0].replace(/ |,/,"") + '};\n\n');
        //
        //
        mzndata += 'crl = [';
        for (var i = 0; i < crlen - 1; i++)
            mzndata += ('CR' + crs[i].ID.toString() + ', ');
        mzndata += ('CR' + crs[crlen - 1].ID.toString() + '];\n\n');
        //
        mzndata += 'asset_list = [';
        for (var i = 0; i < assetlen - 1; i++)
            mzndata += (assetList[i].UniquePlatformID.replace(/ /g, "_") + ', ');
        mzndata += (assetList[assetlen - 1].UniquePlatformID.replace(/ /g, "_") + '];\n\n');
        //
        mzndata += 'nai_list = [' + [...new Set(crlocations)].toString() + '];\n\n';
        // for (var i = 0; i < crlen-1; i++)
        //   mzndata += (crs[i].Location.split(";")[0].replace(/ |,/,"") + ', ');
        // mzndata += (crs[crlen-1].Location.split(";")[0].replace(/ |,/,"") + '];\n\n');
        //
        mzndata += 'base_list = [' + [...new Set(assetlocations)].toString() + '];\n\n';
        // for (var i = 0; i < assetlen-1; i++)
        //   mzndata += (assetList[i].Location.split(";")[0].replace(/ |,/,"") + ', ');
        // mzndata += (assetList[assetlen-1].Location.split(";")[0].replace(/ |,/,"") + '];\n\n');
        //
        //
        mzndata += 'required_int = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += (crs[i].Sensor + ', ');
        mzndata += (crs[crlen - 1].Sensor + '];\n\n');
        //
        mzndata += 'priority = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += '1, ';
        mzndata += '1];\n\n';
        //
        mzndata += 'location = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += (crs[i].Location.split(";")[0].replace(/ |,/, "") + ', ');
        mzndata += (crs[crlen - 1].Location.split(";")[0].replace(/ |,/, "") + '];\n\n');
        //
        mzndata += 'location_int = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += ([...new Set(crlocations)].findIndex((el) => el == crs[i].Location.split(";")[0].replace(/ |,/, "")) + 1 + ', ');
        mzndata += ([...new Set(crlocations)].findIndex((el) => el == crs[crlen - 1].Location.split(";")[0].replace(/ |,/, "")) + 1 + '];\n\n');
        //
        mzndata += 'required_start_time = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += (crs[i].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + ', ');
        mzndata += (crs[crlen - 1].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + '];\n\n');
        //
        mzndata += 'required_duration = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += (crs[i].Coll_End_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) - crs[i].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + ', ');
        mzndata += (crs[crlen - 1].Coll_End_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) - crs[crlen - 1].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + '];\n\n');
        //
        mzndata += 'ops_start_time = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += (crs[i].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + ', ');
        mzndata += (crs[crlen - 1].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + '];\n\n');
        //
        mzndata += 'ops_duration = ['
        for (var i = 0; i < crlen - 1; i++)
            mzndata += (crs[i].Coll_End_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) - crs[i].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + ', ');
        mzndata += (crs[crlen - 1].Coll_End_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) - crs[crlen - 1].Coll_Start_Time.split(":").reduce((prev, curr) => Number(prev) * 60 + Number(curr), 0) + '];\n\n');
        //
        mzndata += 'sensor = ['
        for (var j = 0; j < 7; j++) {
            mzndata += '| ';
            for (var i = 0; i < assetlen - 1; i++)
                mzndata += '1, ';
            if (j === 6)
                mzndata += '1|];\n\n'
            else
                mzndata += '1\n'
        }
        //
        mzndata += 'capacity = ['
        for (var i = 0; i < assetlen - 1; i++)
            mzndata += (Number(assetList[i].Capacity) * 60).toString() + ', ';
        mzndata += (Number(assetList[assetlen - 1].Capacity) * 60).toString() + '];\n\n';
        //
        mzndata += 'on_station = ['
        for (var j = 0; j < assetlen - 1; j++)
            mzndata += '0, ';
        mzndata += '0];\n\n'
        //
        mzndata += 'home = ['
        for (var i = 0; i < assetlen - 1; i++)
            mzndata += (assetList[i].Location.split(";")[0].replace(/ |,/, "") + ', ');
        mzndata += (assetList[assetlen - 1].Location.split(";")[0].replace(/ |,/, "") + '];\n');
        //
        mzndata += 'home_int = ['
        for (var i = 0; i < assetlen - 1; i++) {
            mzndata += '|'
            const tempindex = ([...new Set(assetlocations)].findIndex((el) => el == assetList[i].Location.split(";")[0].replace(/ |,/, "")) + 1);
            for (var j = 0; j < [...new Set(assetlocations)].length - 1; j++) {
                if (j + 1 === tempindex)
                    mzndata += '1'
                else
                    mzndata += '0'
                mzndata += ', '
            }
            if (tempindex === [...new Set(assetlocations)].length)
                mzndata += '1\n';
            else
                mzndata += '0\n';
        }
        mzndata += '|];\n\n'
        mzndata = mzndata.replace(/\(|\)/g, "")
        mzndata = mzndata.replace(/-/g, "_")
        mzndata = mzndata.replace(/\./g, "")
        mzndata = mzndata.replace(/(?<=[0-9])N(?=[0-9])|(?<=[0-9])E(?=[0-9|,|}|\]'])/g, "")
        console.log(mzndata);
        const response = await fetch("http://localhost:5000", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "text/plain",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: mzndata.toString()
        })
        console.log("response: ", response.json())
    }

    return { prepareAllocation }
}