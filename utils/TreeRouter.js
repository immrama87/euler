var TreeRouter = (function(treeString){
  var TreeNode = (function(value){
    var children = [];
    var parents = []
    return {
      addChild: function(node){
        children.push(node);
      },
      getChildren: function(){
        return children;
      },
      addParent: function(node){
        parents.push(node);
      },
      getParents: function(){
        return parents;
      },
      getValue: function(){
        return value;
      },
      getBestPathValue: function(){
        var value = parseInt(value);
        var max = 0;
        for(var i=0;i<parents.length;i++){
          var parentValue = parents[i].getBestPathValue();
          if(parentValue > max){
            max = parentValue;
          }
        }

        return value + max;
      }
    }
  });

  var rows = [];
  var treeRows = treeString.split("\n");
  for(var i=0;i<treeRows.length;i++){
    var cells = treeRows[i].split(" ");
    rows[i] = [];
    for(var j=0;j<cells.length;j++){
      var node = new TreeNode(cells[j]);

      if(i>0){
        if(rows[i-1].length > j){
          rows[i-1][j].addChild(node);
          node.addParent(rows[i-1][j]);
        }

        if(j-1 >= 0){
          rows[i-1][j-1].addChild(node);
          node.addParent(rows[i-1][j-1]);
        }
      }

      rows[i].push(node);
    }
  }

  return {
    getNode: function(row, cell){
      return rows[row][cell];
    },
    getRowCount: function(){
      return rows.length;
    },
    getNodeCount: function(row){
      return rows[row].length;
    }
  }
});

module.exports = TreeRouter;
