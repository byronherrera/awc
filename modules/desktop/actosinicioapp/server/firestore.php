<?php
require '../../../../includes/vendor/autoload.php';
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;


class Firestore
{
    private $database;
    private $name;

    public function __construct($collection) {
        //$this->serviceAccount = ServiceAccount::fromJsonFile('../../../../includes/dqmactoinicio.json');

        //$factory = (new Factory())->withDatabaseUri('https://dqmactoinicio.firebaseio.com');
        $factory = (new Factory())->withServiceAccount('../../../../includes/dqmactoinicio.json');
        $this->database = $factory->createDatabase();
        $this->name = $collection;
    }

    public function getAll(){
        $arr = [];
        $query = $this->database->getReference($this->name)->getSnapshot()->getValue();
        /*if (!empty($query)) {
            /*foreach ($query as $value) {
                //$key = $this->database->getReference($this->name)->getChild($id)->($value->cedula)->getKey();
                $arr[] = $value;
            }/
            array_push($arr,$query);
        }*/
        return $query;
    }

    public function get($id = NULL){
        if (empty($id) || !isset($id)) { return FALSE; }

        if ($this->database->getReference($this->name)->getSnapshot()->hasChild($id)){
            return $this->database->getReference($this->name)->getChild($id)->getValue();
        } else {
            return FALSE;
        }
    }

    public function getWhere($field, $operator, $value)
    {
        $arr = [];
        //$query = $this->database->getReference($this->name)->where($field,$operator,$value)->getValue();
        $query = $this->database->getReference("formulario")->orderByValue()->getSnapshot()->getValue();
        if (!empty($query)) {
            foreach ($query as $value) {
                $arr[] = $value->data();
            }
        }
        return $arr;
    }

    function insert ($data){
        if (empty($data) || !isset($data)) { return FALSE; }
        foreach ($data as $key => $value){
            $this->database->getReference()->getChild($this->name)->getChild($key)->set($value);
        }
        return TRUE;
    }

    function delete ($database,$userID){
        if (empty($userID) || !isset($userID)) { return FALSE; }
        if ($this->database->getReference($this->name)->getSnapshot()->hasChild($userID)){
            $this->database->getReference($this->name)->getChild($userID)->remove();
            return TRUE;
        } else {
            return FALSE;
        }
    }
}