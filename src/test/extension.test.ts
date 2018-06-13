
import * as assert from 'assert';
import * as myExtension from '../extension';

suite("Extension Tests", function () {

    test("parseInputCorrectInputFormat", function() {
        var expected_valid : boolean = true;
        var expected_columns = "3";
        var expected_rows = "3";
        var result = myExtension.parseInput("3,3");
        assert.equal( expected_valid, result.valid);
        assert.equal( expected_rows, result.rows);
        assert.equal( expected_columns, result.columns);
    });

    test("parseInputWrongInputFormat", function() {
        var expected_valid : boolean = true;
        var expected_columns = "3";
        var expected_rows = "3";
        var result = myExtension.parseInput("3,b");
        assert.notEqual( expected_valid, result.valid);
        assert.notEqual( expected_rows, result.rows);
        assert.notEqual( expected_columns, result.columns);
        
    });

    test("generateString3,3,center", function() {
        
        var expected_string = "|       |       |       |" + '\n' +    
                            "| :---: | :---: | :---: |" + '\n' +
                            "|       |       |       |" + '\n' +
                            "|       |       |       |" + '\n' +
                            "|       |       |       |" + '\n' + '\n' ;
        var result_string = myExtension.generateString("3", "3", "center");
        assert.equal( expected_string, result_string );
        
    });

});