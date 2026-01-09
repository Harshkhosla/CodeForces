import { Router } from "express";


const router = Router();
// PAGINATION
router.get("/active", async(req,res)=>{
    const {offset ,page} = req.query;

})
// PAGINATION
router.get("/finished", async(req,res)=>{
     const {offset ,page} = req.query;

})

router.get("/:contestId", async(req,res)=>{
    const contestId = req.params.contestId

})

router.get("/:contestId/:challangeId", async(req,res)=>{
    const {contestId ,challangeId} = req.params

})

router.get("/leader/:challangeId", async(req,res)=>{
    const { challangeId} = req.params

})

router.post("/submit/:challangeId", async(req,res)=>{
    // add rate limiting
    // max 20 submission
    // store the response in the sorted redis set
    const { challangeId} = req.params

})
export default router