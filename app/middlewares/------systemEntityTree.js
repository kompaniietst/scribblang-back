generateTree = (entities) => {
    let tree = new Tree(entities);
    let resu = tree.print();
    // return resu;

    next();

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
    }

    print() {
        console.log(' ');
        console.log(this.root);

        return this.root;
    }

    insert(allData) {
        for (let i = 0; i < allData.length; i++) {

            var nodeIsRoot = allData[i].path.length === 0
            var parentName = nodeIsRoot
                ? allData[i].name
                : allData[i].path[0];

            let parent = this.root.children.find(c => c.name === parentName);
            console.log('... ', parent);

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
