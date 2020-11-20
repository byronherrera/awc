<?php
require '../../../../includes/vendor/autoload.php';
use Kreait\Firebase\Factory;


class Firestore
{
    private $database;
    private $name;

    public function __construct($collection) {
        //$factory = (new Factory())->withDatabaseUri('https://dqmactoinicio.firebaseio.com');
        $factory = (new Factory())->withServiceAccount('../../../../includes/dqmactoinicio.json');
        $this->database = $factory->createDatabase();
        $this->name = $collection;
    }

    public function getAll(){
        $query = $this->database->getReference($this->name)->getSnapshot()->getValue();
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

    public function set($id = NULL, $campo = NULL, $value = NULL){
        if (empty($id) || !isset($id)) { return FALSE; }
        if (empty($campo) || !isset($campo)) { return FALSE; }

        if ($this->database->getReference($this->name)->getSnapshot()->hasChild($id)){
            $this->database->getReference($this->name)->getChild($id.'/'.$campo)->set($value);
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function getWhere($campo = NULL, $value = NULL)
    {
        if (empty($campo) || !isset($campo)) { return FALSE; }

        return $this->database->getReference($this->name)->orderByChild($campo)->equalTo($value)
            ->getSnapshot()->getValue();
    }

    public function getLike($campo = NULL, $value = NULL)
    {
        if (empty($campo) || !isset($campo)) { return FALSE; }

        return $this->database->getReference($this->name)->orderByChild($campo)->startAt($value)->endAt($value.'\uf8ff')
            ->getSnapshot()->getValue();
    }

    function insert ($data){
        if (empty($data) || !isset($data)) { return FALSE; }
        foreach ($data as $key => $value){
            $this->database->getReference()->getChild($this->name)->getChild($key)->set($value);
        }
        return TRUE;
    }

    function delete ($userID){
        if (empty($userID) || !isset($userID)) { return FALSE; }
        if ($this->database->getReference($this->name)->getSnapshot()->hasChild($userID)){
            $this->database->getReference($this->name)->getChild($userID)->remove();
            return TRUE;
        } else {
            return FALSE;
        }
    }
}