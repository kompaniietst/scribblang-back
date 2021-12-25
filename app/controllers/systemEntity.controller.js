const db = require('../models');

const SystemEntityType = db.systemEntityType;
const SystemEntity = db.systemEntity;

exports.allsystementites = (req, res) => {
    SystemEntity
        .find({ uid: req.userId })
        .populate({ path: "type", model: "SystemEntityType", select: "name" })
        .exec((err, entities) => {
            // console.log("----------------------------------------");
            // console.log('req', req.userId);
            // console.log("----------------------------------------");
            // console.log('entities', entities);
            // console.log("----------------------------------------");
            // console.log("----------------------------------------");
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            let tree = new Tree(entities);
            res.status(200).send(tree);
        })
}

exports.createSystemEntity = (req, res) => {

    const systemEntity = new SystemEntity({
        name: req.body.name,
        path: req.body.path,
        createdAt: new Date(),
        uid: req.body.uid
    })


    systemEntity.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.type) {
            SystemEntityType.find(
                {
                    name: { $in: req.body.type }
                },
                (err, fileTypes) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    // console.log('.');
                    // console.log('fileTypes ', fileTypes);
                    // console.log('.');

                    systemEntity.type = fileTypes[0]._id;

                    console.log('saving', fileTypes);
                    // console.log(' ');
                    // console.log('NEWsystemEntity ', systemEntity);
                    // console.log(' ');
                    // user.roles = roles.map(role => role._id);
                    systemEntity.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        console.log('saving2');


                        res.status(200).send({
                            id: systemEntity._id,
                            name: systemEntity.name,
                            type: {
                                _id: systemEntity._id,
                                type: req.body.type
                            },
                            createdAt: systemEntity.createdAt,
                            uid: systemEntity.uid
                            // email: user.email,
                            // // roles: authorities,
                            // token: token
                        });
                    });
                }



            )
        }
    })

    // res.status(200).send("folder in creation");
}

class Node {
    constructor(name, data) {
        this.name = name;
        this.children = [];
        this._id = !data ? null : data._id;
        this.path = !data ? null : data.path;
        this.type = !data ? null : data.type;
        this.createdAt = !data ? null : data.createdAt;
        this.hidden = false;
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