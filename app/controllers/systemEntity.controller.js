const db = require('../models');
const mongoose = require("mongoose");
const SystemEntityType = db.systemEntityType;
const SystemEntity = db.systemEntity;

exports.allsystementites = (req, res) => {
    SystemEntity
        .find({ uid: req.userId })
        // .populate()
        .populate({ path: "type", model: "SystemEntityType", select: "name" })
        .exec((err, data) => {
            // console.log('data: ', data);

            // console.log("----------------------------------------");
            // console.log('req', req.userId);
            // console.log("----------------------------------------");
            // const entities = data
            //     .map(ents => {
            //         return { ...ents }
            //         // return [...entities, type: entities.type.name]
            //     })


            const entities = data.map(entity => {
                return {
                    _id: entity.id,
                    name: entity.name,
                    path: entity.path,
                    createdAt: entity.createdAt,
                    uid: entity.uid,
                    type: entity.type.name
                }
            });

            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            let tree = new Tree(entities);
            res.status(200).send(tree);
        })
}

exports.getSystemEntity = (req, res) => {
    console.log('uid: req.userId = ', req.userId);
    const entityId = req.params["id"];
    console.log('entityId', entityId);

    SystemEntity.findOne(
        {
            id: { $in: req.userId },
            _id: { $in: entityId },
        })
        .populate({ path: "type", model: "SystemEntityType", select: "name" })
        .exec((err, data) => {
            // console.log('errr ', err);
            // console.log(' ');
            // console.log('res ', res);

            if (err) {
                console.log('err', ReferenceError);
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({
                _id: data.id,
                name: data.name,
                type: data.type.name,
                path: data.path
            });
        })
}

exports.createSystemEntity = (req, res) => {
    console.log('uid: req.userId = ', req.userId);
    console.log('data', req.body);
    const uid = req.userId;




    const systemEntity = new SystemEntity({
        name: req.body.name,
        path: req.body.path,
        createdAt: new Date(),
        type: new SystemEntityType({
            // _id: req.userId,
            name: req.body.type
        }),
        uid: uid
    })


    systemEntity.save((err, user) => {
        if (err) {
            console.log('err', ReferenceError);
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.type) {
            SystemEntityType.findOne(
                {
                    name: { $in: req.body.type }
                },
                (err, fileType) => {
                    if (err) {
                        console.log('err in filety');
                        res.status(500).send({ message: err });
                        return;
                    }

                    // console.log('.');
                    console.log('fileTypes ', fileType);
                    // console.log('.');

                    systemEntity.type = fileType._id;

                    // console.log('saving', fileTypes);
                    // console.log(' ');
                    // console.log('NEWsystemEntity ', systemEntity);
                    // console.log(' ');
                    // user.roles = roles.map(role => role._id);
                    systemEntity.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        // console.log('saving2');


                        res.status(200).send({
                            id: systemEntity._id,
                            name: systemEntity.name,
                            path: systemEntity.path,
                            type: fileType.name,
                            createdAt: systemEntity.createdAt,
                            uid: uid
                        });
                    });
                }



            )
        }
    })

    // res.status(200).send("folder in creation");
}

exports.updateSystemEntity = (req, res) => {
    console.log('uid: req.userId = ', req.userId);

    const entityId = req.params["id"];
    const uid = req.userId;
    console.log('ID', entityId);


    SystemEntityType.findOne(
        { name: req.body.type },
        (err, r) => {
            if (err) {
                console.log('ERRR type', err);
                res.status(500).send({ message: err });
                return;
            }
            console.log('r tytpe', r);



            SystemEntity.findOneAndUpdate(
                {
                    id: { $in: req.userId },
                    _id: { $in: entityId }
                },

                {
                    $set: {
                        name: req.body.name,
                        type: r
                    },
                },
                (err, r) => {
                    if (err) {
                        console.log('ERRR', err);
                        res.status(500).send({ message: err });
                        return;
                    }
                    console.log('r', r);
                }


            )

        })







    // systemEntity.save((err, user) => {
    //     if (err) {
    //         console.log('err', ReferenceError);
    //         res.status(500).send({ message: err });
    //         return;
    //     }

    //     if (req.body.type) {
    //         SystemEntityType.find(
    //             {
    //                 name: { $in: req.body.type }
    //             },
    //             (err, fileTypes) => {
    //                 if (err) {
    //                     console.log('err in filety');
    //                     res.status(500).send({ message: err });
    //                     return;
    //                 }

    //                 // console.log('.');
    //                 // console.log('fileTypes ', fileTypes);
    //                 // console.log('.');

    //                 systemEntity.type = fileTypes[0]._id;

    //                 // console.log('saving', fileTypes);
    //                 // console.log(' ');
    //                 // console.log('NEWsystemEntity ', systemEntity);
    //                 // console.log(' ');
    //                 // user.roles = roles.map(role => role._id);
    //                 systemEntity.save(err => {
    //                     if (err) {
    //                         res.status(500).send({ message: err });
    //                         return;
    //                     }

    //                     // console.log('saving2');


    //                     res.status(200).send({
    //                         id: systemEntity._id,
    //                         name: systemEntity.name,
    //                         path: systemEntity.path,
    //                         type: systemEntity.type,
    //                         createdAt: systemEntity.createdAt,
    //                         uid: uid
    //                     });
    //                 });
    //             }



    //         )
    //     }
    // })

    // res.status(200).send("folder in creation");
}

exports.deleteSystemEntity = (req, res) => {
    const id = req.params.id;

    SystemEntity
        .deleteOne({ _id: { $in: id } },
            (err) => {
                if (err)
                    res.status(500).send({ message: err });

                console.log('err', err);
                console.log('fileTypes', fileTypes);

                res.status(200);
            })
}

class Node {
    constructor(name, data) {
        this.name = name;
        this.children = [];
        this._id = !data ? null : data._id;
        this.path = !data ? null : data.path;
        this.type = !data ? null : data.type;
        this.createdAt = !data ? null : data.createdAt;
    }

    addChild(childData, level) {
        if (childData.path.length === level + 1) {
            this.children.push(new Node(childData.name, childData));
            return;
        }

        let nextParentName = childData.path[level + 1];
        let nextParent = this.children.find(c => c.name === nextParentName);
        // console.log('       ', nextParent);
        if (!nextParent) {
            nextParent = new Node(nextParentName);
            this.children.push(nextParent);
        }

        nextParent.addChild(childData, level + 1);

    }
}

class Tree {
    constructor(data) {
        this.data = data;

        if (!this.root)
            this.root = new Node('System');

        if (this.data)
            this.insert(data);

        return this.root;
    }

    print() {
        console.log(' ');
        // console.log(this.root);

        return this.root;
    }

    insert(allData) {
        for (let i = 0; i < allData.length; i++) {

            var nodeIsRoot = allData[i].path.length === 0
            var parentName = nodeIsRoot
                ? allData[i].name
                : allData[i].path[0];

            let parent = this.root.children.find(c => c.name === parentName);
            // console.log('... ', parent);

            if (!parent) {
                parent = new Node(parentName, allData[i]);
                this.root.children.push(parent);
            }
            if (nodeIsRoot)
                continue;
            parent.addChild(allData[i], 0);
        }

    }
}