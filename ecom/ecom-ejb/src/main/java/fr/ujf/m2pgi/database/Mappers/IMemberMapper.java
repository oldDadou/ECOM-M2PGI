package fr.ujf.m2pgi.database.Mappers;

import fr.ujf.m2pgi.database.DTO.MemberDTO;
import fr.ujf.m2pgi.database.entities.Member;

import javax.annotation.PostConstruct;
import javax.ejb.Local;

/**
 * Created by FAURE Adrien on 29/10/15.
 */
public interface IMemberMapper extends IGeneriqueMapper<MemberDTO, Member> {

}
