import { FlightPlan, Plan, Requirement, Task } from "./usePlan"
import { useState } from "react"

export const useMiniZinc = () => {

    const [allocation, setAllocation] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const [flightPlans, setFlightPlans] = useState<FlightPlan[]>([])


    const generateCostMatrix = (plan: Plan) => {
        const _locationList = [...new Set(plan.requirements.map((requirement) => requirement.Coordinates.split(";")[0])), ...new Set(plan.assets.map((asset) => asset.Location))]
        console.log("locationList: ", _locationList)
        const len = _locationList.length
        var costMatrix = []
        for (var i = 0; i < len; i++) {
            costMatrix[i] = []
            for (var j = 0; j < len; j++) {
                // @ts-ignore
                costMatrix[i].push(Math.ceil(distBetweenCoords(_locationList[i], _locationList[j]) / 313 * 60))
            }
        }
        console.log("costMatrix: ", costMatrix)
        return costMatrix
    }

    const distBetweenCoords = (coords1: string, coords2: string) => {
        const templat1 = Number(coords1.split("N")[0])
        const templat2 = Number(coords2.split("N")[0])
        const templon1 = Number(coords1.split("N")[1].split("E")[0])
        const templon2 = Number(coords2.split("N")[1].split("E")[0])
        return getDistanceFromLatLonInKm(templat1, templon1, templat2, templon2);
    }

    const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return Math.floor(d);
    }

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180)
    }

    // transforms the response from MZN into a JS Object for display
    const MZNResult_to_AllocationObject = (plan: Plan, _allocation: string) => {
        let temp = _allocation
            .replace(/=/g, ':')
            .replace(/;/g, ',')
            .replace(/travel/, '+')
            .split('+')[0];
        console.log(temp);
        const base = temp;
        // @ts-ignore
        const collectionStart = /(?<=allocated_collection_start : array1d\(CR, \[).*(?=\]\),)/
            .exec(base)[0]
            .replace(/CR\d*: /g, '')
            .split(', ')
            .map((entry) => Number(entry));
        // @ts-ignore
        const collectionDuration = /(?<=allocated_collection_duration : array1d\(CR, \[).*(?=\]\),)/
            .exec(base)[0]
            .replace(/CR\d*: /g, '')
            .split(', ')
            .map((entry: string) => Number(entry));
        // @ts-ignore
        const assets = /(?<=asset_used : array1d\(ASSET, \[).*(?=\]\),)/
            .exec(base)[0]
            .replace(/: [01]/g, '')
            .split(', ');

        console.log(collectionStart)
        console.log(collectionDuration)
        console.log(assets)

        let s = temp.replace(/ctl_binary : array2d\(CR, ASSET, \[|\]\),\nasset_used/g, ',+').split('+')[1];
        console.log("s: ", s)
        const re = /[01](?=,)/g;

        var m;
        var ctl_binary_array = [];
        do {
            m = re.exec(s);
            if (m) ctl_binary_array.push(m[0]);
        } while (m);

        console.log(ctl_binary_array) // ok

        //console.log(results)
        //console.log(typeof(_allocation))

        let tasks: Task[] = [];
        const len = plan.assets.length;
        console.log(len);
        const today = new Date();
        var count = 0;
        for (var i = 0; i < ctl_binary_array.length; i++) {
            if (ctl_binary_array[i] === '1') {
                const startMins = collectionStart[Math.floor(i / len)];
                const durationMins = collectionDuration[Math.floor(i / len)];
                tasks.push({
                    ID: count++,
                    Asset_Used: plan.assets[i % len].UniquePlatformID,
                    Coordinates: plan.requirements[Math.floor(i / len)].Coordinates,
                    Requirement_to_Collect: plan.requirements[Math.floor(i / len)].ID.toString(),
                    Start: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                        Math.floor(startMins / 60),
                        startMins % 60
                    ),
                    End: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                        Math.floor((startMins + durationMins) / 60),
                        (startMins + durationMins) % 60
                    )
                });
            }
        }
        console.log("tasks: ", tasks);

        //

        const temp2 = _allocation
        let _s = temp2.replace(/travel = array3d\(.*, \[|\]\)\;\ncr_collected/g, ',+').split('+')[1];
        console.log("_s: ", _s)
        const _re = /[01](?=,)/g;

        var _m;
        var travel_array = [];
        do {
            _m = _re.exec(_s);
            if (_m) travel_array.push(_m[0]);
        } while (_m);

        console.log(travel_array) // ok

        let _flightPlans: FlightPlan[] = [];
        const _locationList = [...new Set(plan.requirements.map((requirement) => requirement.Coordinates.split(";")[0])), ...new Set(plan.assets.map((asset) => asset.Location))]
        const location_len = _locationList.length;
        const asset_len = travel_array.length / location_len ** 2;
        console.log(location_len);
        var count = 0;

        for (var i = 0; i < asset_len; i++) {
            const flightLocations = [];
            flightLocations.push(plan.assets[i].Location);
            for (var j = 0; j < location_len; j++) {
                for (var k = 0; k < location_len; k++) {
                    if (travel_array[asset_len * (j * location_len + k) + i] === '1') {
                        flightLocations.push(_locationList[j]);
                    }
                }
            }
            _flightPlans.push({
                ID: count++,
                Asset_Used: plan.assets[i].UniquePlatformID,
                Flight_Path: [...flightLocations],
            });
        }

        // for (var i = 0; i < travel_array.length; i = i + location_len ** 2) {
        //     const flightLocations = [];
        //     for (var j = 0; j < location_len ** 2; j++) {
        //         if (travel_array[i + j] === '1') {
        //             flightLocations.push(_locationList[Math.floor(j / location_len)]);
        //             flightLocations.push(_locationList[Math.floor(j % location_len)]);
        //         }
        //     }

        //     _flightPlans.push({
        //         ID: count++,
        //         Asset_Used: plan.assets[i / (location_len**2)].UniquePlatformID,
        //         Flight_Path: flightLocations,
        //     });

        // }
        console.log("flightplans: ", _flightPlans);
        setFlightPlans(_flightPlans)

        //

        //setAllocation(tasks)
        setLoading(false)
        return tasks;
    }

    const prepareAllocation = async (plan: Plan) => {
        setLoading(true)
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
            mzndata += (assetList[i].UniquePlatformID.replace(/ /g, "_") + ', ');
        }
        mzndata += (assetList[assetlen - 1].UniquePlatformID.replace(/ /g, "_") + '};\n\n');
        //
        mzndata += 'INTELL = {HUMINT, IMINT, MASINT, ACINT, OSINT, SIGINT, EW};\n\n';
        //
        mzndata += "NAI = {'" + [...new Set(crlocations)].toString().replaceAll(",", "', '") + "'};\n\n";
        // for (var i = 0; i < crlen-1; i++)
        //   mzndata += (crs[i].Location.split(";")[0].replace(/ |,/,"") + ', ');
        // mzndata += (crs[crlen-1].Location.split(";")[0].replace(/ |,/,"") + '};\n\n');
        //
        mzndata += "BASE = {'" + [...new Set(assetlocations)].toString().replaceAll(",", "', '") + "'};\n\n";
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
        mzndata += "nai_list = ['" + [...new Set(crlocations)].toString().replaceAll(",", "', '") + "'];\n\n";
        // for (var i = 0; i < crlen-1; i++)
        //   mzndata += (crs[i].Location.split(";")[0].replace(/ |,/,"") + ', ');
        // mzndata += (crs[crlen-1].Location.split(";")[0].replace(/ |,/,"") + '];\n\n');
        //
        mzndata += "base_list = ['" + [...new Set(assetlocations)].toString().replaceAll(",", "','") + "'];\n\n";
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
        mzndata += "location = ['"
        for (var i = 0; i < crlen - 1; i++)
            mzndata += (crs[i].Location.split(";")[0].replace(/ |,/, "") + "', '");
        mzndata += (crs[crlen - 1].Location.split(";")[0].replace(/ |,/, "") + "'];\n\n");
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
        mzndata += "home = ['"
        for (var i = 0; i < assetlen - 1; i++)
            mzndata += (assetList[i].Location.split(";")[0].replace(/ |,/, "") + "', '");
        mzndata += (assetList[assetlen - 1].Location.split(";")[0].replace(/ |,/, "") + "'];\n\n");
        //
        mzndata += 'home_int = ['
        for (var i = 0; i < assetlen; i++) {
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
        const costMatrix = generateCostMatrix(plan)

        mzndata += 'cost = ['
        for (var i = 0; i < costMatrix.length - 1; i++) {
            mzndata += '|'
            for (var j = 0; j < costMatrix.length; j++) {
                mzndata += costMatrix[i][j] + ', '
            }
            mzndata += '\n'
        }
        mzndata += '|'
        for (var j = 0; j < costMatrix.length - 1; j++) {
            mzndata += costMatrix[costMatrix.length - 1][j] + ', '
        }
        mzndata += costMatrix[costMatrix.length - 1][costMatrix.length - 1] + '|];\n\n'

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
        response.text().then((data) => {
            console.log("data: ", data)
            const _allocation = MZNResult_to_AllocationObject(plan, data)
            setAllocation(_allocation)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    return { prepareAllocation, allocation, flightPlans, loading }
}