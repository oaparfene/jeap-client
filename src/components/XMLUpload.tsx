import React, { useContext } from 'react'
var parseString = require('xml2js').parseString;
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Requirement } from '@/hooks/usePlan';
import { JAPContext } from '@/app/context';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function XMLUpload() {
  const { allRequirements, addCRs } = useContext(JAPContext)


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const xml = e.target?.result
        parseString(xml, function (err: any, payload: any) {
          console.log(payload)
          const result = payload.CollectionRequirement
          const coordPoint = result.GeographicAreaOfInterestReference[0].GeographicAreaOfInterest[0]["d3p1:GeographicArea"][0]["d3p1:Point"][0]
          console.log(coordPoint)
          const CR_To_Add : Requirement = {
            ID: allRequirements.length + 1,
            Operation: "5G",
            Requester: result.Originator[0].Requestor[0],
            Location: `Target ${allRequirements.length} - Point Location`,
            Coordinates: `${coordPoint["d3p1:Latitude"][0]._}N, ${coordPoint["d3p1:Longitude"][0]._}E`,
            Coll_Start_Time: result.CollectionInterval[0].StartDateTimeZulu[0]._.split("T")[1].slice(0, 5),
            Coll_End_Time: result.CollectionInterval[0].EndDateTimeZulu[0]._.split("T")[1].slice(0, 5),   
            LTIOV: new Date(2023, 10, 27).toDateString(),
            Required_Information: result.RequiredInformation[0],
            Intel_Discipline: result.IntelCollectionDiscipline[0],
            Required_Product: "ISREXREP",
            Recurrance: "",
          }
          console.log(CR_To_Add)
        })
      }
      reader.readAsText(file)
    }
  }
  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload CR XML
      <VisuallyHiddenInput type="file" onChange={handleFileUpload} accept={".xml"}/>
    </Button>
  )
}

export default XMLUpload